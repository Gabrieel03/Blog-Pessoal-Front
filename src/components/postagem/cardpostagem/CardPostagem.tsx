import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'



interface CardPostagensProps {
  post: Postagem
}

function CardPostagens({ post }: CardPostagensProps) {

  // Formatação simples de data para o padrão Brasileiro
  // Se der erro no 'Intl', certifique-se que a data venha correta do back
  let dataFormatada = new Date(post.data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className='flex flex-col rounded-xl overflow-hidden justify-between bg-slate-800 border border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
      
      {/* Cabeçalho do Card: Foto e Nome do Usuário */}
      <div className="flex items-center gap-4 py-3 px-4 bg-slate-900 border-b border-slate-700">
        <img 
          src={post.usuario?.foto || "https://i.imgur.com/HeOe814.png"} // Foto ou Placeholder
          alt="Foto do Usuário" 
          className='h-10 w-10 rounded-full object-cover border-2 border-teal-500'
        />
        <div className="flex flex-col">
            <h3 className='text-sm font-bold text-white uppercase'>
                {post.usuario?.nome}
            </h3>
            <span className='text-xs text-slate-400'>
                {dataFormatada}
            </span>
        </div>
      </div>

      {/* Corpo do Post: Título e Texto */}
      <div className='p-6 flex flex-col gap-4'>
        <h4 className='text-xl font-bold text-teal-400'>
            {post.titulo}
        </h4>
        <p className='text-slate-300 leading-relaxed'>
            {post.texto}
        </p>
        
        {/* Tag do Tema */}
        <div className="flex w-full">
            <span className="text-xs font-bold bg-slate-700 text-teal-200 py-1 px-3 rounded-full">
                #{post.tema?.descricao}
            </span>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex border-t border-slate-700">
        <Link to={`/editarPostagem/${post.id}`} className='w-full'>
          <button className='w-full text-slate-100 bg-sky-600 hover:bg-sky-500 flex items-center justify-center py-3 font-bold transition-colors'>
            Editar
          </button>
        </Link>
        <Link to={`/deletarPostagem/${post.id}`} className='w-full'>
          <button className='w-full text-white bg-red-600 hover:bg-red-500 flex items-center justify-center py-3 font-bold transition-colors'>
            Deletar
          </button>
        </Link>
      </div>

    </div>
  )
}

export default CardPostagens