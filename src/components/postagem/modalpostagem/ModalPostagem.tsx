import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormPostagem from '../formpostagem/FormPostagem';

function ModalPostagem() {
  return (
    <Popup
      trigger={
        <button 
          className='rounded bg-teal-500 text-slate-900 font-bold py-3 px-6 hover:bg-teal-400 hover:scale-105 transition-all shadow-lg shadow-teal-500/40 cursor-pointer'
        >
          Nova Postagem
        </button>
      }
      modal
      contentStyle={{ 
        padding: '0px', 
        border: 'none', 
        background: 'transparent', 
        width: 'auto',
        maxWidth: '800px'
      }}
    >
      {/* Adicione esta linha abaixo para silenciar o erro de tipagem: */}
      {/* @ts-ignore */}
      {(close: any) => (
        
        <div className='bg-slate-900 rounded-xl border border-slate-700 shadow-2xl w-full mx-auto'>
          
          <div className="flex justify-end p-2">
             <button onClick={() => close()} className="text-slate-400 hover:text-red-500 font-bold px-2">
                X
             </button>
          </div>

          <div className="px-6 pb-6">
          </div>

        </div>
      )}
    </Popup>
  );
}

export default ModalPostagem;