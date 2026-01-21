import {  useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { SyncLoader } from "react-spinners"; // Certifique-se de ter instalado: npm install react-spinners
import type Tema from "../../../models/Tema";
import type Postagem from "../../../models/Postagem";

// Interface opcional caso use dentro de um Modal
interface FormPostagemProps {
    closeModal?: () => void;
}

function FormPostagem({ closeModal }: FormPostagemProps) {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token]);

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        buscarTemas()
        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        if (closeModal) {
            closeModal(); // Fecha o modal se estiver sendo usado como tal
        } else {
            navigate('/postagens'); // Ou volta para a lista
        }
    }

    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (id !== undefined) {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token, },
                });
                alert('Postagem atualizada com sucesso');
            } else {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token, },
                });
                alert('Postagem cadastrada com sucesso');
            }
            retornar();
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            } else {
                alert('Erro ao processar a Postagem');
            }
        }

        setIsLoading(false);
    }

    return (
        // Container Principal: Garante o fundo escuro (slate-900) e centralização
        <div className="flex flex-col items-center justify-center mx-auto w-full min-h-[80vh] bg-slate-900 py-8 px-4">
            
            <h1 className="text-4xl text-center text-white font-bold mb-8">
                {id !== undefined ? 'Editar' : 'Cadastrar'} <span className="text-teal-500">Postagem</span>
            </h1>

            {/* O Card do Formulário */}
            <form 
                className="w-full max-w-2xl flex flex-col gap-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl" 
                onSubmit={gerarNovaPostagem}
            >

                {/* Input Título */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo" className="text-slate-300 text-sm uppercase tracking-wider font-semibold">
                        Título da Postagem
                    </label>
                    <input
                        value={postagem.titulo || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Ex: Minha viagem incrível"
                        name="titulo"
                        required
                        className="rounded p-4 bg-slate-900 border border-slate-700 placeholder-slate-500 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all"
                    />
                </div>

                {/* Input Texto */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="texto" className="text-slate-300 text-sm uppercase tracking-wider font-semibold">
                        Texto da Postagem
                    </label>
                    <input
                        value={postagem.texto || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Descreva aqui o conteúdo..."
                        name="texto"
                        required
                        className="rounded p-4 bg-slate-900 border border-slate-700 placeholder-slate-500 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all"
                    />
                </div>

                {/* Select de Tema */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="tema" className="text-slate-300 text-sm uppercase tracking-wider font-semibold">
                        Tema da Postagem
                    </label>
                    <select 
                        name="tema" 
                        id="tema" 
                        className='rounded p-4 bg-slate-900 border border-slate-700 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all cursor-pointer appearance-none' 
                        onChange={(e) => buscar(`/temas/${e.currentTarget.value}`, setTema, { headers: { Authorization: token } })}
                    >
                        <option value="" selected disabled>Selecione um Tema</option>
                        {temas.map((tema) => (
                            <option key={tema.id} value={tema.id} className="bg-slate-800 text-white py-2">
                                {tema.descricao}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-between gap-4 mt-4">
                     <button
                        type="button"
                        onClick={retornar}
                        className="w-1/2 rounded bg-slate-700 py-3 font-bold text-slate-200 hover:bg-red-500 hover:text-white transition-all shadow-md"
                    >
                        Cancelar
                    </button>
                    
                    <button
                        type='submit'
                        className="w-1/2 rounded bg-teal-500 text-slate-900 font-bold py-3 flex justify-center items-center hover:bg-teal-400 hover:scale-[1.02] transition-all shadow-lg shadow-teal-500/30"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <SyncLoader color="#0f172a" size={8} margin={4} speedMultiplier={0.7} />
                        ) : (
                            <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormPostagem;