import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { handleLogout } = useContext(AuthContext);

    function logout() {

        handleLogout();
        alert("Usuario foi desconectado com sucesso!");
        navigate("/");
    }



    return (
        <>
            <div className='w-full bg-slate-900 text-white flex justify-center py-4 border-b border-slate-800'>
                <div className="container flex justify-between text-lg mx-8 items-center">

                    <div className='text-2xl font-bold uppercase tracking-wide cursor-pointer hover:text-teal-400 transition-colors'>
                        <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>
                    </div>

                    <div className='flex gap-8 font-medium'>

                        <div className='cursor-pointer hover:text-teal-400 hover:underline underline-offset-4 transition-all'>
                            Postagens
                        </div>
                        <div className='cursor-pointer hover:text-teal-400 hover:underline underline-offset-4 transition-all'>
                            <Link to='/temas' className='hover:underline'>Temas</Link>
                        </div>
                        <div className='cursor-pointer hover:text-teal-400 hover:underline underline-offset-4 transition-all'>
                            <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                        </div>
                        <div className='cursor-pointer hover:text-teal-400 hover:underline underline-offset-4 transition-all'>
                            Perfil
                        </div>
                        <div className='cursor-pointer hover:text-red-400 hover:underline underline-offset-4 transition-all'>
                            <Link to = '' onClick={logout} className="hover: underline">Sair</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar