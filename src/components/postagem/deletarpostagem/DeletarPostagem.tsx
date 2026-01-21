import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar, deletar } from "../../../services/Service"
import { SyncLoader } from "react-spinners"
import type Postagem from "../../../models/Postagem"

function DeletarPostagem() {

    const navigate = useNavigate()

    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { 'Authorization': token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
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
        navigate("/postagens")
    }

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: { 'Authorization': token }
            })

            alert('Postagem apagada com sucesso')
            retornar()

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            } else {
                alert('Erro ao apagar a Postagem')
            }
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-slate-900 flex justify-center items-center px-4">
            
            <div className="container w-full max-w-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl flex flex-col gap-6 items-center">
                
                <h1 className="text-4xl font-bold text-white text-center">
                    Deletar <span className="text-red-500">Postagem</span>
                </h1>

                <p className="text-slate-300 text-center text-lg">
                    Você tem certeza de que deseja apagar a postagem abaixo?
                </p>

                {/* Card de Preview da Postagem */}
                <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-6 flex flex-col gap-4 shadow-inner">
                    
                    {/* Título */}
                    <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase text-slate-500 font-bold tracking-wider">
                            Título
                        </span>
                        <h3 className="text-xl font-bold text-teal-400">
                            {postagem.titulo}
                        </h3>
                    </div>

                    {/* Texto (Preview curto) */}
                    <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase text-slate-500 font-bold tracking-wider">
                            Conteúdo
                        </span>
                        <p className="text-slate-300 italic text-sm line-clamp-3">
                            "{postagem.texto}"
                        </p>
                    </div>

                    {/* Tema */}
                    <div className="flex flex-col gap-1 border-t border-slate-800 pt-2">
                        <span className="text-xs uppercase text-slate-500 font-bold tracking-wider">
                            Tema
                        </span>
                        <span className="text-sm font-semibold text-teal-200 bg-slate-800 py-1 px-3 rounded w-fit">
                            {postagem.tema?.descricao}
                        </span>
                    </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex w-full gap-4 mt-2">
                    
                    {/* Botão NÃO (Voltar - Seguro - Verde Água) */}
                    <button 
                        className="w-1/2 bg-teal-500 text-slate-900 font-bold py-3 rounded hover:bg-teal-400 hover:scale-[1.02] transition-all shadow-lg shadow-teal-500/20"
                        onClick={retornar}
                    >
                        Não
                    </button>

                    {/* Botão SIM (Apagar - Perigo - Vermelho) */}
                    <button 
                        className="w-1/2 bg-red-600 text-white font-bold py-3 rounded flex justify-center items-center hover:bg-red-500 hover:scale-[1.02] transition-all shadow-lg shadow-red-600/20"
                        onClick={deletarPostagem}
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

export default DeletarPostagem