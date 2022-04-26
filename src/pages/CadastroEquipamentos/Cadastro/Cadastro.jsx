import { Link } from "react-router-dom";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import './cadastro.scss';

import imageEquipamento from "../../../assets/equipamento.png"
import imageEvaporadora from "../../../assets/evaporadora.png"
import imageCondensadora from "../../../assets/condensadora.png"

export default function Cadastro() {
  return (
    <div className="cadastro">
        <Sidebar/>
        <div className="cadastroContainer">
            <Navbar/>

            <div className="boxCardsCadastro">
                <div className="CadEquip">
                    <img src={imageEquipamento} alt="icone equipamento" />
                    <h2>Registrar Equipamento</h2>
                    <Link to="/cadastrar/equipamento">Cadastrar</Link>
                </div>
                <div className="CadEvapo">
                    <img src={imageEvaporadora} alt="icone evaporadora" />
                    <h2>Registrar Evaporadora</h2>
                    <Link to="/cadastrar/equipamento/evaporadora">Cadastrar</Link>

                </div>
                <div className="CadConden">
                    <img src={imageCondensadora} alt="icone condensadora" />
                    <h2>Registrar Condensadora</h2>
                    <Link to="/cadastrar/equipamento/condensadora">Cadastrar</Link>

                </div>
            </div>
        </div>
    </div>
  )
}
