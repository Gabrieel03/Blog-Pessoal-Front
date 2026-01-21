import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import CardPostagem from "../cardpostagem/CardPostagem";
import type Postagem from "../../../models/Postagem";

function ListaPostagens() {

  const navigate = useNavigate();

  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [token]);

  async function buscarPostagens() {
    setIsLoading(true);
    try {
      await buscar('/postagens', setPostagens, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    buscarPostagens()
  }, [postagens.length])

  return (
    // Container Principal: Fundo Escuro
    <div className="min-h-screen bg-slate-900 w-full flex justify-center py-8 px-4">
        <div className="container flex flex-col">
            
            {/* Cabeçalho da Seção */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold text-white">
                  Feed de <span className="text-teal-500">Postagens</span>
                </h2>
                
                <button 
                  onClick={() => navigate('/cadastroPostagem')}
                  className="rounded bg-teal-500 text-slate-900 font-bold py-3 px-6 hover:bg-teal-400 hover:scale-105 transition-all shadow-lg shadow-teal-500/40"
                >
                  Nova Postagem
                </button>
            </div>

            {/* Loading Spinner */}
            {isLoading && (
               <div className="flex justify-center items-center h-64">
                 <SyncLoader color="#14b8a6" size={15} margin={5} />
               </div>
            )}

            {/* Lista Vazia */}
            {!isLoading && postagens.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 bg-slate-800/50 rounded-xl border border-slate-700">
                    <span className="text-3xl text-slate-400 font-bold text-center">
                        Nenhuma postagem encontrada!
                    </span>
                    <p className="text-slate-500 mt-2">Seja o primeiro a postar algo incrível.</p>
                </div>
            )}

            {/* Grid de Cards Responsivo */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {postagens.map((post) => (
                <CardPostagem key={post.id} post={post} />
              ))}
            </div>

        </div>
    </div>
  );
}

export default ListaPostagens;