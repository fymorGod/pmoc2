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

        const fetchData = async () => {
            const data = await app.get('/equipamentos');
            console.log(data)
            setEquipamentos(data['data'])
        }

        fetchData()
            .catch(console.error);
    }, [])

  return (
    <div className="equipamentos">
        <Sidebar />
        <div className="equipamentosContainer">
            <Navbar />
            <div className="cardEquipamento">
                {
                    Object.entries(equipamentos).map(([e, value]) => (
                        <div key={value.id} className="card">
                            <img src={evaporadora} alt="" />                            
                                <h2>{value.codigo}</h2>                             
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
