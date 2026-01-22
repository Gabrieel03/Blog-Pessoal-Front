import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";



function Perfil() {
    
    const navigate = useNavigate();

    const { usuario } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token === "") {
            alert("Você precisa estar logado");
            navigate("/");
        }
    }, [usuario.token])

    const fotoPerfil = usuario.foto && usuario.foto !== "" ? usuario.foto : "https://i.imgur.com/HeOe814.png";
    const fotoCapa = "https://i.imgur.com/P67N08R.jpg";


    return (
        <div className='min-h-screen bg-slate-900 flex justify-center items-center py-8 px-4'>
      
      {/* Card Principal do Perfil (Estilo "Vidro" igual aos Forms) */}
      <div className='container max-w-2xl relative w-full bg-slate-800/50 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm'>

        {/* 1. Área da Capa (Banner) */}
        <div className="h-48 w-full relative">
           <img 
             className="w-full h-full object-cover opacity-80" 
             src={fotoCapa}
             alt="Capa do Perfil" 
           />
           {/* Overlay escuro para o texto brilhar mais */}
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        </div>

        {/* 2. Foto de Perfil (Avatar Sobreposto) */}
        {/* Usa margem negativa (-mt-24) para subir e ficar em cima da capa */}
        <div className="flex justify-center -mt-24 relative z-10 mb-6">
           <img 
             className="rounded-full w-44 h-44 object-cover border-[6px] border-slate-900 shadow-xl ring-4 ring-teal-500" 
             src={fotoPerfil} 
             alt={`Foto de perfil de ${usuario.nome}`} 
           />
        </div>

        {/* 3. Dados do Usuário (Campos estilizados) */}
        <div className="flex flex-col gap-6 px-8 pb-8">
            
            <h2 className="text-3xl font-bold text-center text-white mb-4">
               Meu <span className="text-teal-500">Perfil</span>
            </h2>

            {/* Campo: Nome */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 text-sm uppercase tracking-wider font-semibold flex items-center gap-2">
                 {/* <User size={18} /> */} Nome Completo
              </label>
              {/* Caixa com estilo de input, mas apenas leitura */}
              <div className="rounded p-4 bg-slate-900 border border-slate-700 text-white font-medium text-lg shadow-inner">
                 {usuario.nome}
              </div>
            </div>

            {/* Campo: Email */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 text-sm uppercase tracking-wider font-semibold flex items-center gap-2">
                 {/* <EnvelopeSimple size={18} /> */} E-mail / Usuário
              </label>
              {/* Caixa com estilo de input, mas apenas leitura */}
              <div className="rounded p-4 bg-slate-900 border border-slate-700 text-white font-medium text-lg shadow-inner truncate">
                 {usuario.usuario}
              </div>
            </div>

            {/* Botão de Ação */}
            <div className="mt-4 flex justify-center">
              <button 
                onClick={() => navigate('/home')}
                className="w-full md:w-1/2 rounded bg-teal-500 text-slate-900 font-bold py-3 flex justify-center items-center hover:bg-teal-400 hover:scale-[1.02] transition-all shadow-lg shadow-teal-500/30 uppercase tracking-wide"
              >
                Voltar para Home
              </button>
            </div>

        </div>

      </div>
    </div>
    )
}
export default Perfil;