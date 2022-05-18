import { useEffect, useState } from 'react';
import { app } from '../../api/app';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './manutencoes.scss';
import evaporadora from "../../assets/evaporadora.png";
import CheckIcon from '@mui/icons-material/Check';

export default function Manutencoes() {
    const [manutencao, setManutencao] = useState([])
    const [file, setFile] = useState('')
    const [inicioManutencao, setInicioManutencao] = useState(false)

    useEffect(() => {
        app.get('/manutencoes').then(response => {
            console.log(response.data)
            setManutencao(response.data)
        })
    }, [])


    const verificar = (valor) => {
        if (valor === "a executar" || valor === "atrasado" || valor === "em espera") {
            return (<button className='btnIniciar' >Iniciar</button>)
        }
        else if (valor === "em execução") {
            return (<div><button className='btnInterromper' >Interromper</button> <button className='btnConcluir' >Finalizar</button></div>)
        }
        else if (valor === "realizado") {
            return (<span>Finalizado</span>)
        }
    }

    // const uploadData = new FormData();
    // uploadData.append("file", file)
    // const handleFile = () => {
    //     app.put('/manutencoes', uploadData).then(response => {
    //         console.log("mandei o arquivo")
    //     })
    // }

    return (
        <div className='manutencoes'>
            <Sidebar />

            <div className="manutencoesContainer">
                <Navbar />

                <div className="boxCardsManutencoes">
                    {
                        manutencao.map((m) => (
                            <div className="cardManutencao" key={m.id}>
                                <div className="containerManutencao">
                                    <div className="iconManu">
                                        <img src={evaporadora} alt="icone evaporadora" />
                                        <h2>Manutenção {m.tipo} - {m.descricao}</h2>
                                        <div className="inputFile" style={{ display: "flex", alignItems: 'center', }}>
                                            <label htmlFor="arquivo" id="file" >Adicionar Arquivo</label>
                                            <input type="file" name="arquivo" id="arquivo" onChange={e => setFile(e.target.files[0])} />
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
                                                }}

                                            >
                                                <CheckIcon className="iconBtn" />
                                            </button>
                                        </div>
                                    </div>

                                </div>

                                <div className="boxTables" >
                                    <h3 >Informações</h3>
                                    <div className="tables" >
                                        <table key={m.id} >
                                            <tr >
                                                <strong style={{ marginRight: "10px", color: '#222' }}>Técnico Responsável:</strong>
                                                <td>{m.tec_responsavel}</td>
                                            </tr>
                                            <tr>
                                                <strong style={{ marginRight: "10px", color: '#222' }}>Custo:</strong>
                                                <td>{m.custo}</td>
                                            </tr>
                                            <tr>
                                                <strong style={{ marginRight: "10px", color: '#222' }}>Status:</strong>
                                                <td>{m.status}</td>
                                            </tr>
                                            <tr >
                                                <strong style={{ marginRight: "10px", color: '#222' }}>Previsão de Término:</strong>
                                                <td>{m.previsao_termino}</td>
                                            </tr>
                                        </table>

                                    </div>

                                </div>

                                <div className="box-tables">
                                    <h3>Tarefas</h3>  
                                    {
                                       m.tipo === 'corretiva' && m.corretiva ? 
                                       m.corretiva.map(c => (
                                           <div className="tables">
                                            <ul >
                                                
                                                <li style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    marginTop: '10px'
                                                }}>    
                                                                                          
                                                    {c.item}
                                                </li>
                                                <li>
                                                    {
                                                        c.descricao
                                                    }
                                                </li>
                                            </ul>
                                           </div>
                                       ))
                                       :  null
                                    }
                                   </div>
                                    {
                                          m.tipo === 'preventiva' && m.preventiva  ? 
                                          m.preventiva.map(p => (
                                               <div className="tables">
                                                <ul >
                                                    
                                                    <li style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        marginTop: '10px'
                                                    }}>    
                                                                                              
                                                        {p.item}
                                                    </li>
                                                    <li>
                                                        {
                                                            p.tarefa
                                                        }
                                                    </li>
                                                </ul>
                                               </div>
                                           )) : null
                                    }
                                {verificar(m.status)}


                            </div>
                        )

                        )
                    }

                </div>

            </div>
        </div>
    )
}
