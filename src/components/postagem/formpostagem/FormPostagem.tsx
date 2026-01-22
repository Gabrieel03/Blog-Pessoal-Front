import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import type Tema from "../../../models/Tema";
import type Postagem from "../../../models/Postagem";
import { ToastAlert } from "../../../utils/ToastAlert";


function FormPostagem() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', });
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
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarPostagemPorId(id: string) {
        try {
            // CORREÇÃO 1: Usamos uma função manual aqui para atualizar Postagem E Tema ao mesmo tempo
            await buscar(`/postagens/${id}`, (dados: Postagem) => {
                setPostagem(dados);
                setTema(dados.tema || { id: 0, descricao: "" }); // Garante que o tema seja carregado no Select
            }, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
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

    // CORREÇÃO 2: Nova função específica para o Textarea (ele tem tipagem diferente do Input)
    function atualizarEstadoTextArea(e: ChangeEvent<HTMLTextAreaElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (id !== undefined) {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token, },
                });
                ToastAlert('Postagem atualizada com sucesso!', 'sucesso')
            } else {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token, },
                });
                ToastAlert('Postagem cadastrada com sucesso!', 'sucesso')
            }
            retornar();
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            } else {
                // Mostra o erro real no console para ajudar a depurar se persistir
                console.error(error);
                ToastAlert('Erro ao processar a Postagem!', 'erro')
            }
        }

        setIsLoading(false);
        retornar();
    }

    const carregarTema = tema.descricao === ''

    return (
        <div className="flex flex-col items-center justify-center mx-auto w-full min-h-[80vh] bg-slate-900 py-8 px-4">

            <h1 className="text-4xl text-center text-white font-bold mb-8">
                {id !== undefined ? 'Editar' : 'Cadastrar'} <span className="text-teal-500">Postagem</span>
            </h1>

            <form
                className="w-full max-w-2xl flex flex-col gap-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl"
                onSubmit={gerarNovaPostagem}
            >

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

                {/* CORREÇÃO 3: Trocamos INPUT por TEXTAREA */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="texto" className="text-slate-300 text-sm uppercase tracking-wider font-semibold">
                        Texto da Postagem
                    </label>
                    <textarea
                        value={postagem.texto || ''}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstadoTextArea(e)}
                        placeholder="Descreva aqui o conteúdo..."
                        name="texto"
                        required
                        rows={5} // Define altura inicial de 5 linhas
                        className="rounded p-4 bg-slate-900 border border-slate-700 placeholder-slate-500 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all resize-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="tema" className="text-slate-300 text-sm uppercase tracking-wider font-semibold">
                        Tema da Postagem
                    </label>
                    <select
                        name="tema"
                        id="tema"
                        className='rounded p-4 bg-slate-900 border border-slate-700 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all cursor-pointer appearance-none'
                        onChange={(e) => buscar(`/temas/${e.currentTarget.value}`, setTema, { headers: { Authorization: token } })}
                        // CORREÇÃO 4: Forçamos o select a mostrar o valor correto do estado 'tema'
                        value={tema.id || ''}
                    >
                        <option value="" disabled>Selecione um Tema</option>
                        {temas.map((tema) => (
                            <option key={tema.id} value={tema.id} className="bg-slate-800 text-white py-2">
                                {tema.descricao}
                            </option>
                        ))}
                    </select>
                </div>

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
                        disabled={carregarTema || isLoading}
                    >
                        {isLoading ? (
                            <SyncLoader color="#0f172a"
                             size={8} 
                             margin={4} 
                             speedMultiplier={0.7} />
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