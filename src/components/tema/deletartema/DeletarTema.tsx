import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar, deletar } from "../../../services/Service"
import { SyncLoader } from "react-spinners"
import type Tema from "../../../models/Tema"

function DeletarTema() {

    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { 'Authorization': token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/temas")
    }

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: { 'Authorization': token }
            })

            alert('Tema apagado com sucesso')
            retornar()

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                alert('Erro ao apagar o Tema')
            }
            setIsLoading(false)
            retornar()
        }

        function retornar() {
            navigate("/temas")
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 flex justify-center items-center px-4">
            
            <div className="container w-full max-w-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-2xl flex flex-col gap-6 items-center">
                
                <h1 className="text-4xl font-bold text-white text-center">
                    Deletar <span className="text-red-500">Tema</span>
                </h1>

                <p className="text-slate-300 text-center text-lg">
                    Você tem certeza de que deseja apagar o tema a seguir?
                </p>

                {/* Card de destaque do Tema */}
                <div className="w-full bg-slate-900 border border-slate-700 rounded-lg p-6 flex flex-col gap-2 items-center justify-center">
                    <span className="text-sm uppercase text-slate-500 font-bold tracking-wider">
                        Descrição
                    </span>
                    <span className="text-2xl font-bold text-teal-400 text-center">
                        {tema.descricao}
                    </span>
                </div>

                {/* Botões de Ação */}
                <div className="flex w-full gap-4 mt-4">
                    
                    {/* Botão NÃO (Voltar - Seguro) */}
                    <button 
                        className="w-1/2 bg-teal-500 text-slate-900 font-bold py-3 rounded hover:bg-teal-400 hover:scale-[1.02] transition-all shadow-lg shadow-teal-500/20"
                        onClick={retornar}
                    >
                        Não
                    </button>

                    {/* Botão SIM (Apagar - Perigo) */}
                    <button 
                        className="w-1/2 bg-red-600 text-white font-bold py-3 rounded flex justify-center items-center hover:bg-red-500 hover:scale-[1.02] transition-all shadow-lg shadow-red-600/20"
                        onClick={deletarTema}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <SyncLoader 
                                color="#ffffff" 
                                size={8} 
                                margin={4} 
                                speedMultiplier={0.7}
                            />
                        ) : (
                            <span>Sim</span>
                        )}
                    </button>

                </div>

            </div>
        </div>
    )
}

export default DeletarTema