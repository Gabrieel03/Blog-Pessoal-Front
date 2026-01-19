import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/home");
            console.log(usuario);
        }
    }, [usuario]);

    function updatedState(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-slate-900 text-white font-bold">

                {/* Lado Esquerdo: Formulário */}
                <div className="flex justify-center items-center p-8">
                    <form className="w-full max-w-md flex flex-col gap-6"
                        onSubmit={login}>

                        <h2 className="text-5xl text-teal-500 text-center mb-8">Entrar</h2>

                        {/* Campo Usuário */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="usuario" className="text-slate-300">Usuário</label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                placeholder="Seu e-mail"
                                className="rounded p-3 bg-slate-800 border-2 border-slate-700 placeholder-slate-500 focus:border-teal-400 focus:outline-none transition-all"
                                value={usuarioLogin.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedState(e)}
                            />
                        </div>

                        {/* Campo Senha */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="senha" className="text-slate-300">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="Sua senha"
                                className="rounded p-3 bg-slate-800 border-2 border-slate-700 placeholder-slate-500 focus:border-teal-400 focus:outline-none transition-all"
                                value={usuarioLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedState(e)}
                            />
                        </div>

                        {/* Botão Entrar */}
                        <button
                            type='submit'
                            className="w-full rounded bg-teal-500 py-3 font-bold text-slate-900 hover:bg-teal-400 hover:scale-105 transition-all flex justify-center items-center mt-4"
                        >
                            {isLoading ?
                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                /> :
                                <span>Entrar</span>
                            }
                        </button>

                        <hr className="border-slate-700 w-full" />

                        <p className="text-center text-slate-300">
                            Ainda não tem uma conta?{' '}

                            <Link to="/cadastro" className="text-teal-500 hover:underline hover:text-teal-400 transition-colors">
                                Cadastre-se
                            </Link>
                        </p>

                    </form>
                </div>

                {/* Lado Direito: Imagem */}
                <div className="hidden md:block bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] bg-cover bg-center">
                    <div className="h-full w-full bg-black/50 backdrop-blur-sm"></div>
                </div>

            </div>
        </>
    )
}

export default Login