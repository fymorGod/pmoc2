
import { useEffect, useState } from 'react';
import { app } from '../../api/app';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './manutencoes.scss';
import evaporadora from "../../assets/evaporadora.png";

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
