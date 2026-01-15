import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"


function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-slate-900 text-white border-t border-slate-800">
                <div className="container flex flex-col items-center py-8">

                    <p className="text-xl font-bold">
                        Blog Pessoal Generation | Copyright: {data}
                    </p>

                    <p className="text-lg mb-4 text-slate-300">Acesse nossas redes sociais</p>

                    <div className="flex gap-4">

                        <a href="https://www.linkedin.com/in/gabriel-andrade-brito/" target="_blank">
                            <LinkedinLogoIcon size={48} weight="bold" className="cursor-pointer hover:text-blue-500 transition-colors duration-300" />
                        </a>

                        <a href="https://www.instagram.com/gaabrieel03/" target="_blank">
                            <InstagramLogoIcon size={48} weight="bold" className="cursor-pointer hover:text-pink-500 transition-colors duration-300" />
                        </a>

                        <a href="https://github.com/Gabrieel03" target="_blank">
                            <GithubLogoIcon size={48} weight="bold" className="cursor-pointer hover:text-zinc-800 transition-colors duration-300" />
                        </a>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer