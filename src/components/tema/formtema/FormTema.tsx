import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { SyncLoader } from 'react-spinners';
import { ToastAlert } from "../../../utils/ToastAlert";


function FormTema() {

    const navigate = useNavigate();

    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/temas")
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                ToastAlert('O Tema foi atualizado com sucesso!', 'sucesso')
                retornar()
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlert('Erro ao atualiazar o tema!', 'erro')
                }
            }
        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                ToastAlert('O Tema foi cadastrado com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlert('Erro ao cadastrar um Tema!', 'erro')
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="min-h-screen bg-slate-900 flex justify-center items-center px-4">

            <div className="container flex flex-col items-center justify-center mx-auto">

                <h1 className="text-4xl text-center text-white font-bold my-8">
                    {id === undefined ? 'Cadastrar' : 'Editar'} <span className="text-teal-500">Tema</span>
                </h1>

                <form className="w-full max-w-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-2xl flex flex-col gap-6" onSubmit={gerarNovoTema}>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="descricao" className="text-slate-300 text-sm uppercase tracking-wider font-semibold">
                            Descrição do Tema
                        </label>
                        <input
                            type="text"
                            placeholder="Ex: Estratégias de RPG, Jogos, Filmes..."
                            name='descricao'
                            className="rounded p-4 bg-slate-900 border border-slate-700 placeholder-slate-500 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all"
                            value={tema.descricao}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
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
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <SyncLoader
                                    color="#0f172a" // Cor das bolinhas
                                    size={8}        // Tamanho das bolinhas
                                    margin={4}      // Espaço entre elas
                                    speedMultiplier={0.7} // Velocidade da animação (opcional)
                                />
                            ) : (
                                <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default FormTema;