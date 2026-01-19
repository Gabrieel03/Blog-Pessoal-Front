function Home() {
    return (
        <>
            <div className="bg-slate-900 flex justify-center min-h-[85vh]">
                <div className="container grid grid-cols-1 md:grid-cols-2 text-white">

                    <div className="flex flex-col gap-6 items-center justify-center py-4 px-4 text-center md:text-left md:items-start">

                        <h2 className="text-5xl font-bold">
                            Seja <span className="text-teal-400">Bem Vindo!</span>
                        </h2>

                        <p className="text-xl text-slate-300">
                            Expresse aqui seus pensamentos e opiniões de forma livre.
                        </p>

                        <div className="flex justify-around gap-4">
                            <button className="items-center rounded bg-teal-500 text-slate-900 font-bold py-3 px-8 hover:bg-teal-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/50">
                                Nova Postagem
                            </button>
                        </div>

                        <button className="rounded border-2 border-slate-100 py-3 px-8 font-bold hover:bg-slate-100 hover:text-slate-900 transition-all">
                            Ver Postagens
                        </button>
                    </div>

                    <div className="flex justify-center items-center p-4">
                        <img
                            src="https://i.imgur.com/fyfri1v.png"
                            alt="Imagem da Página Home"
                            className="w-2/3 md:w-3/4 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home;