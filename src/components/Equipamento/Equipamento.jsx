import { useEffect, useState } from 'react';
import { app } from "../../api/app";
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './equipamento.scss';
import evaporadora from "../../assets/evaporadora.png";
import condensadora from "../../assets/condensadora.png";

export default function Equipamento() {
  const { id } = useParams();
  const [equip, setEquip] = useState([]);
  useEffect(() => {
    app.get(`/equipamentos/${id}`).then(response => {
        console.log(response.data['data'])
        setEquip(response.data['data'])
    })

}, [])
    // const tipoManutencao = (t) => {
    //     if (t === "preventivo")
    // }

    // const status = (s) => {
    //     if (s === "a executar" || s === "atrasado" || s === "em espera"){
    //         return ( <div className="status">
    //                     <span className='statusVerde'>A executar</span>
    //                     <div className='verde'></div>
    //                 </div>
    //             )
    //     }
    //     else if (s === "em execução") {
    //         return ( <div className="status">
    //                     <span></span>
    //                     <div className='verde'></div>
    //                 </div> 
    //         )
    //     }
    //     else if (s === "realizado"){
    //         return ( <span>Finalizado</span>)
    //     }
    // }

  return (
    <div className='equipamento'>
        <Sidebar/>

        <div className="equipamentoContainer">
            <Navbar/>

            <div className="showEvaporadora">
              <div className="boxEvapoIcon">
                <img src={evaporadora} alt="icone evaporadora" />
                {
                  equip.map(e => {
                    return (
                      <h2 key={e.id}>{e.codigo}</h2>
                    )
                  })
                }
              </div>
                <div className="tabelaEvapo">
                {
                            equip.map(equipamento => {
                                return (
                                    <table key={equipamento.id}>
                                        <tr>
                                           <strong> Marca:</strong>
                                            <td>{equipamento.evaporadora.marca}</td>
                                        </tr>
                                        <tr>
                                            <strong>Modelo:</strong>
                                            <td>{equipamento.evaporadora.modelo}</td>
                                        </tr>
                                    </table>
                                )
                            })
                        }
                </div>
                <div className="tabelaEvapoSecond">
                {
                            equip.map(equipamento => {
                                return (
                                    <table key={equipamento.id}>
                                        <tr >
                                            <strong>Potência:</strong>
                                            <td>{equipamento.evaporadora.potencia}</td>
                                        </tr>
                                        <tr>
                                            <strong>Quadro:</strong>
                                            <td>{equipamento.evaporadora.quadro}</td>
                                        </tr>
                                        <tr>
                                            <strong>Status:</strong>
                                            <td>{equipamento.evaporadora.status}</td>
                                        </tr>
                                    </table>
                                )
                            })
                        }
                </div>

                <div className="infoEvapo">
                {
                            equip.map(equipamento => {
                                return (
                                    <table className="table" key={equipamento.id}>
                                    <thead >
                                      <tr >                                        
                                        <th scope="col">Data</th>
                                        <th scope="col">Descrição</th>
                                        <th scope="col">Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>                                        
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>{equipamento.status}</td>
                                      </tr>
                                      <tr>                                       
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>{equipamento.status}</td>
                                      </tr>

                                    </tbody>
                                  </table>
                                )
                            })
                        }
                </div>
                <div className="btn">
                  <button >Remover</button>
                  <button >Editar</button>
                </div>
            </div>

            <div className="showCondensadora">
              <div className="boxCondensaIcon">
                <img src={condensadora} alt="icone condensadora" />
                {
                  equip.map(e => {
                    return (
                      <h2 key={e.id}>{e.condensadora.codigo}</h2>
                    )
                  })
                }
              </div>
                <div className="tabelaCondensa">
                      {
                            equip.map(equipamento => {
                                return (
                                    <table key={equipamento.id}>
                                        <tr>
                                            <strong>Local de Instalação:</strong>
                                            <td>{equipamento.condensadora.local_instalacao}</td>
                                        </tr>
                                        <tr>
                                            <strong>Modelo:</strong>
                                            <td>{equipamento.condensadora.modelo}</td>
                                        </tr>
                                    </table>
                                )
                            })
                        }
                </div>
                <div className="tabelaCondensaSecond">
                {
                            equip.map(equipamento => {
                                return (
                                    <table key={equipamento.id}>
                                        <tr >
                                           <strong>Módulo:</strong>
                                            <td>{equipamento.condensadora.modulo}</td>
                                        </tr>
                                        <tr>
                                            <strong>Quadro:</strong>
                                            <td>{equipamento.condensadora.quadro}</td>
                                        </tr>
                                        <tr>
                                            <strong>Status:</strong>
                                            <td>{equipamento.condensadora.status}</td>
                                        </tr>
                                    </table>
                                )
                            })
                        }
                </div>

                <div className="infoCondensa">
                {
                            equip.map(equipamento => {
                                return (
                                    <table className="table" key={equipamento.id}>
                                        <thead>
                                        <tr >                                        
                                            <th scope="col">Data</th>
                                            <th scope="col">Descrição</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>                                        
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>{equipamento.status}</td>
                                        </tr>
                                        <tr>                                       
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>{equipamento.status}</td>
                                        </tr>

                                        </tbody>
                                  </table>
                                )
                            })
                        }
                </div>
              <div className="btn">
                  <button>Remover</button>
                  <button>Editar</button>
                </div>
                <a href={`/editar/equipamento/${id}`}>Editar Equipamento</a>
            </div>
        </div>
    </div>
  )
}
