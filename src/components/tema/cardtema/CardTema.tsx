import { Link } from "react-router-dom";
import  type Tema  from "../../../models/Tema"

interface CardTemasProps {
    tema: Tema
}

function CardTema ({ tema }: CardTemasProps) {
    return (

        <div className='flex flex-col rounded-2xl overflow-hidden justify-between bg-slate-800 border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-300 hover:-translate-y-2'>

            <header className='py-3 px-6 bg-slate-900 border-b border-slate-700 flex items-center justify-between'>
                <span className='text-lg font-bold text-teal-500 uppercase tracking-wider'>
                    Tema
                </span>
            </header>

            <p className='p-8 text-3xl bg-slate-800 text-slate-200 font-bold h-full'>
                {tema.descricao}
            </p>

            <div className="flex border-t border-slate-700">

                {/* Botão Editar */}
                <Link to={`/editarTema/${tema.id}`} className='w-full'>
                    <button className='w-full text-slate-100 bg-sky-600 hover:bg-sky-500 flex items-center justify-center py-3 font-bold transition-colors'>
                        Editar
                    </button>
                </Link>

                {/* Botão Deletar */}
                <Link to={`/deletarTema/${tema.id}`} className='w-full'>
                    <button className='w-full text-slate-100 bg-red-600 hover:bg-red-500 flex items-center justify-center py-3 font-bold transition-colors'>
                        Deletar
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default CardTema;