import { Link } from 'react-router-dom';
import LogoHC from "../../assets/imgs/logohc.png"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center">
        <br />
        <img src={LogoHC} alt="Imagem da página home" className="flex flex-col size-2/9"/>
        <br />
        <h1 className="text-5xl text-blue-600 font-bold">Bem vindo ao cadastro de Funcionários FMUSP</h1>
        <br />
        <p>Veja as infomrações de todos os funcionários do hospital, caso não esteja cadastrado basta preencher o formulario. Clique no botão a baixo para ver a lista:</p>
        <br />
        <Link to="/ListaFuncionario">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800">
            Veja a Lista de Funcionários
          </button>
        </Link>
    </div>

  )}

