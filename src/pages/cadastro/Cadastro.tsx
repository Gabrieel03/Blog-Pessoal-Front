import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import type Usuario from "../../models/Usuario"
import { cadastraUsuario } from "../../services/Service"

function Cadastro() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [confirmarSenha, setConfirmarSenha] = useState<string>("")

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar()
        }
    }, [usuario])

    function retornar() {
        navigate('/')
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    async function cadastraNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
            setIsLoading(true)

            try {
                await cadastraUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
                alert('Usuario Cadastrado com sucesso!')
            } catch (error) {
                alert('Erro ao  cadastrar o usuario!')
            }
        } else {
            alert('Dados do usuario incosistentes! Verifique as informações de cadastro.')
            setUsuario({ ...usuario, senha: '' })
            setConfirmarSenha('')
        }

        setIsLoading(false)
    }


    return (

        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-slate-900 text-white font-bold">

            <div className="hidden md:block bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] bg-cover bg-center">

                <div className="h-full w-full bg-black/50 backdrop-blur-sm"></div>
            </div>

            {/* Lado Direito: Formulário */}
            <div className="flex justify-center items-center p-8">
                <form className="w-full max-w-md flex flex-col gap-6"
                    onSubmit={cadastraNovoUsuario}>

                    <h2 className="text-5xl text-teal-500 text-center mb-4">Cadastrar</h2>

                    {/* Campo Nome */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-slate-300">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Seu nome completo"
                            className="rounded p-3 bg-slate-800 border-2 border-slate-700 placeholder-slate-500 focus:border-teal-400 focus:outline-none transition-all"
                            value={usuario.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    {/* Campo Usuário */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="usuario" className="text-slate-300">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Seu e-mail (ex: usuario@email.com)"
                            className="rounded p-3 bg-slate-800 border-2 border-slate-700 placeholder-slate-500 focus:border-teal-400 focus:outline-none transition-all"
                            value={usuario.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    {/* Campo Foto */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="foto" className="text-slate-300">Foto</label>
                        <input
                            type="text"
                            id="foto"
                            name="foto"
                            placeholder="Link da sua foto"
                            className="rounded p-3 bg-slate-800 border-2 border-slate-700 placeholder-slate-500 focus:border-teal-400 focus:outline-none transition-all"
                            value={usuario.foto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    {/* Campo Senha */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="senha" className="text-slate-300">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha segura"
                            className="rounded p-3 bg-slate-800 border-2 border-slate-700 placeholder-slate-500 focus:border-teal-400 focus:outline-none transition-all"
                            value={usuario.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    {/* Campo Confirmar Senha */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmarSenha" className="text-slate-300">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            placeholder="Confirme sua senha"
                            className="rounded p-3 bg-slate-800 border-2 border-slate-700 placeholder-slate-500 focus:border-teal-400 focus:outline-none transition-all"
                            value={confirmarSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                        />
                    </div>

                    {/* Botões */}
                    <div className="flex justify-between gap-4 mt-4">
                        <button
                            type='button'
                            className="w-1/2 rounded bg-red-500 py-3 font-bold text-white hover:bg-red-600 hover:scale-105 transition-all flex justify-center"
                            onClick={retornar}
                        >
                            Cancelar
                        </button>

                        <button
                            type='submit'
                            className="w-1/2 rounded bg-teal-500 py-3 font-bold text-slate-900 hover:bg-teal-400 hover:scale-105 transition-all flex justify-center"
                        >
                            {isLoading ?
                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                /> :
                                <span>Cadastrar</span>
                            }
                        </button>

                        <div className="text-center mt-2 border-t border-slate-700/50 pt-4">
                            <p className="text-slate-400 font-normal text-sm">
                                Já tem uma conta?{' '}
                                <Link to="/" className="text-teal-400 font-bold hover:text-teal-300 hover:underline">
                                    Faça login
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Cadastro