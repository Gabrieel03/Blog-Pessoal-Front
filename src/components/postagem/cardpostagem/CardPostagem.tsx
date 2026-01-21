import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagemProps {
  post: Postagem
}

function CardPostagem({ post }: CardPostagemProps) {

  return (
    <div className='flex flex-col rounded-xl overflow-hidden justify-between bg-slate-800 border border-slate-700 shadow-lg hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-1'>

      {/* Cabeçalho do Card: Foto e Nome */}
      <div className='flex items-center gap-4 py-3 px-4 bg-slate-900 border-b border-slate-700'>
        <img
          src={post.usuario?.foto || "https://i.imgur.com/HeOe814.png"}
          alt="Foto do Usuário"
          className='h-12 w-12 rounded-full object-cover border-2 border-teal-500 p-0.5'
        />
        <div className="flex flex-col">
          <h3 className='text-md font-bold text-white uppercase tracking-wide'>
            {post.usuario?.nome}
          </h3>
        </div>
      </div>

      {/* Corpo do Post */}
      <div className='p-6 flex flex-col gap-3 h-full'>

        <h4 className='text-xl font-bold text-teal-400 capitalize'>
          {post.titulo}
        </h4>

        <p className='text-slate-300 leading-relaxed text-sm whitespace-pre-wrap'>
          {post.texto}
        </p>

        {/* Rodapé do conteúdo: Tema e Data */}
        <div className="mt-4 flex flex-col gap-1 border-t border-slate-700/50 pt-3">
          <p className='text-xs text-slate-400 font-semibold'>
            Tema: <span className='text-teal-200'>{post.tema?.descricao}</span>
          </p>

          <p className='text-xs text-slate-500'>
            Data: {new Intl.DateTimeFormat('pt-BR', {
              dateStyle: 'full',
              timeStyle: 'medium',
            }).format(new Date(post.data))}
          </p>
        </div>

      </div>

      {/* Botões de Ação */}
      <div className="flex w-full">
        <Link to={`/editarpostagem/${post.id}`} className='w-full'>
          <button className='w-full text-white bg-sky-600 hover:bg-sky-500 flex items-center justify-center py-3 font-bold transition-colors'>
            Editar
          </button>
        </Link>
        <Link to={`/deletarpostagem/${post.id}`} className='w-full'>
          <button className='w-full text-white bg-red-600 hover:bg-red-500 flex items-center justify-center py-3 font-bold transition-colors'>
            Deletar
          </button>
        </Link>
      </div>

    </div>
  )
}

export default CardPostagem