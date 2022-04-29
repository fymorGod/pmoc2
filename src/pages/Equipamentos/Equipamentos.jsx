import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import './equipamentos.scss';
import { useEffect, useState } from "react";
import { app } from "../../api/app";
import evaporadora from "../../assets/evaporadora.png";
import {Link} from "react-router-dom";

export default function Equipamentos() {
    const [equipamentos, setEquipamentos] = useState([]);
    useEffect(()=> {
        app.get('/equipamentos').then(response => {
            console.log(response.data)
            setEquipamentos(response.data)
        })
    }, [])

  return (
    <div className="equipamentos">
        <Sidebar />
        <div className="equipamentosContainer">
            <Navbar />
            <div className="cardEquipamento">
                {
                    equipamentos.map((e) => (
                        <div key={e.id} className="card">
                            <img src={evaporadora} alt="" />
                            <h2>{e.codigo}</h2>
                            <div className="btn">
                                <Link to={`/equipamentos/${e.id}`} >Abrir</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}
