function Cadastro() {
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-slate-900 text-white font-bold">

            <div className="hidden md:block bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] bg-cover bg-center">

                <div className="h-full w-full bg-black/50 backdrop-blur-sm"></div>
            </div>

            {/* Lado Direito: Formulário */}
            <div className="flex justify-center items-center p-8">
                <form className="w-full max-w-md flex flex-col gap-6">

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
                        />
                    </div>

                    {/* Botões */}
                    <div className="flex justify-between gap-4 mt-4">
                        <button
                            type='button'
                            className="w-1/2 rounded bg-red-500 py-3 font-bold text-white hover:bg-red-600 hover:scale-105 transition-all flex justify-center"
                        >
                            Cancelar
                        </button>

                        <button
                            type='submit'
                            className="w-1/2 rounded bg-teal-500 py-3 font-bold text-slate-900 hover:bg-teal-400 hover:scale-105 transition-all flex justify-center"
                        >
                            Cadastrar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
export default Cadastro