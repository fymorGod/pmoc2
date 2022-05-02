
import { useEffect, useState } from 'react';
import { app } from '../../api/app';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './manutencoes.scss';
import evaporadora from "../../assets/evaporadora.png";
import CheckIcon from '@mui/icons-material/Check';

export default function Manutencoes() {
    const [manutencao, setManutencao] = useState([])
    useEffect(()=> {
        app.get('/manutencoes').then(response => {
            console.log(response.data)
            setManutencao(response.data)
        })
    }, [])


    const verificar = (valor) => {
        if (valor === "a executar" || valor === "atrasado" || valor === "em espera"){
            return ( <button className='btnIniciar'>Iniciar</button> )
        }
        else if (valor === "em execução") {
            return ( <div><button className='btnInterromper'>Interromper</button> <button className='btnConcluir'>Finalizar</button></div> )
        }
        else if (valor === "realizado"){
            return ( <span>Finalizado</span>)
        }
    }

    const handleFile = () => {
        
    }

    return (
    <div className='manutencoes'>
        <Sidebar/>

        <div className="manutencoesContainer">
            <Navbar/>

            <div className="boxCardsManutencoes">
                {
                    manutencao.map((m) => (
                        <div className="cardManutencao" key={m.id}>
                            <div className="containerManutencao">
                                <div className="iconManu">
                                    <img src={evaporadora} alt="icone evaporadora" />
                                    <h2>Manutenção {m.tipo} - {m.descricao}</h2>
                                    <div className="inputFile" style={{display: "flex", alignItems: 'center',}}>
                                        <label htmlFor="arquivo" id="file" >Adicionar Arquivo</label>
                                        <input type="file" name="arquivo" id="arquivo"/>
                                        <button 
                                        style={{
                                            marginTop: '25px',
                                            width: "40px",
                                            height: "35px",
                                            background: "#39d845",
                                            borderRadius: "8px",
                                            outline: 'none',
                                            border: 'none',
                                            textAlign: 'center',
                                            cursor: 'pointer'
                                            }}>
                                            <CheckIcon className="iconBtn"/>
                                        </button>
                                    </div>
                                </div>
        
                            </div>

                            <div className="boxTables" >
                                   <div className="tables" >
                                        <table key={m.id} >
                                            <tr >
                                                <strong style={{ marginRight: "10px"}}>Técnico Responsável:</strong>
                                                <td>{m.tec_responsavel}</td>
                                            </tr>
                                            <tr>
                                                <strong>Custo:</strong>
                                                <td>{m.custo}</td>
                                            </tr>
                                            <tr>
                                                <strong>Status:</strong>
                                                <td>{m.status}</td>
                                            </tr>
                                            <tr >
                                                <strong>Previsão de Término:</strong>
                                                <td>{m.previsao_termino}</td>
                                            </tr>
                                        </table>
                                        
                                   </div>                                            
                            </div>
                            {verificar(m.status)}
                    </div>
                    ))
                }

            </div>

        </div>
    </div>
  )
}
