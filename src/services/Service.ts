import axios from "axios";


const api = axios.create({
    baseURL: 'https://projeto-blogpessoal-3vsc.onrender.com'
})

export const cadastraUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}