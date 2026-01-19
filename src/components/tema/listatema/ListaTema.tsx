import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscar } from '../../../services/Service';
import { AuthContext } from '../../../contexts/AuthContext';
import type Tema from '../../../models/Tema';
import CardTema from "../cardtema/CardTema"
import { SyncLoader } from 'react-spinners';

function ListaTemas() {

const navigate = useNavigate();

const [isLoading, setIsLoading] = useState<boolean>(false);

const [temas, setTemas] = useState<Tema[]>([]);

const { usuario, handleLogout } = useContext(AuthContext);
const token = usuario.token;


useEffect(() => {
  if (token === '') {
    alert ('Você precisa estar logado!');
    navigate('/')
  }
}, [token])

useEffect(() => {
  buscarTemas()
}, [temas.length]);

async function buscarTemas() {
  try {
    setIsLoading(true)
    await buscar('/temas', setTemas, {
      headers: {Authorization: token}
    })
  } catch (error: any) {
    if(error.toString().includes('401')){
      handleLogout()
    }
  }finally{
    setIsLoading(false)
  }
}

  return (
    <>

      <div className="min-h-screen bg-slate-900 w-full flex justify-center py-8 px-4">
        <div className="container flex flex-col">

          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-white">
              Lista de <span className="text-teal-500">Temas</span>
            </h2>
            
            <button 
              onClick={() => navigate('/cadastrartema')}
              className="rounded bg-teal-500 text-slate-900 font-bold py-3 px-6 hover:bg-teal-400 hover:scale-105 transition-all shadow-lg shadow-teal-500/40"
            >
              Novo Tema
            </button>
          </div>
          
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <SyncLoader
                color="#14b8a6"
                size={32}
                />
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-slate-200 h-16 w-16"></div>
            </div>
          )}
          
          {!isLoading && temas.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 bg-slate-800/50 rounded-xl border border-slate-700">
               <span className="text-3xl text-slate-400 font-bold text-center">
                  Nenhum Tema foi encontrado!
               </span>
               <p className="text-slate-500 mt-2">Que tal cadastrar o primeiro?</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temas.map((tema) => (
              <CardTema key={tema.id} tema={tema} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaTemas;