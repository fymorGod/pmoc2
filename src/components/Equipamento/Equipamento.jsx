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
                      <h2 key={e.id}>{e.evaporadora.codigo}</h2>
                    )
                  })
                }
              </div>
                <div className="tabelaEvapo">
                {
                            equip.map(equipamento => {
                                return (
                                    <table key={equipamento.id}>
                                        <tr >
                                            Código:
                                            <td>{equipamento.evaporadora.codigo}</td>
                                        </tr>
                                        <tr>
                                            Marca:
                                            <td>{equipamento.evaporadora.marca}</td>
                                        </tr>
                                        <tr>
                                            Modelo:
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
                                    <table key={equipamento.codigo}>
                                        <tr >
                                            Potência:
                                            <td>{equipamento.evaporadora.potencia}</td>
                                        </tr>
                                        <tr>
                                            Quadro:
                                            <td>{equipamento.evaporadora.quadro}</td>
                                        </tr>
                                        <tr>
                                            Status:
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
                                    <table className="table">
                                    <thead key={equipamento.codigo}>
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
                                    <table>
                                        <tr key={equipamento.codigo}>
                                        Código:
                                            <td>{equipamento.condensadora.codigo}</td>
                                        </tr>
                                        <tr>
                                            Local de Instalação:
                                            <td>{equipamento.condensadora.local_instalacao}</td>
                                        </tr>
                                        <tr>
                                            Modelo:
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
                                    <table>
                                        <tr key={equipamento.codigo}>
                                           Módulo:
                                            <td>{equipamento.condensadora.modulo}</td>
                                        </tr>
                                        <tr>
                                            Quadro:
                                            <td>{equipamento.condensadora.quadro}</td>
                                        </tr>
                                        <tr>
                                            Status:
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
                                    <table className="table">
                                        <thead>
                                        <tr key={equipamento.codigo}>                                        
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
            </div>
        </div>
    </div>
  )
}
