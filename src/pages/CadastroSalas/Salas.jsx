import { useEffect, useState } from "react";
import { app } from "../../api/app";
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './salas.scss';

export default function Salas() {
    const [nome, setNome] = useState();
    const [andar, setAndar] = useState();
    const [dimensao, setDimensao] = useState();

    const [setores, setSetores] = useState([]);
    const [ setoresId, setSetorId] = useState('')

    useEffect(() => {
        app
            .get("/setores")//rota de salas
            .then((response) => setSetores(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);
    function handleAdd() {
        app.post('/salas', {            
            "nome": nome,
            "andar": andar,
            "dimensao": dimensao,
            "id_setor": setoresId
            }).then((response) => {
                console.log(response.data)
            
            });
        }
    
    const handleSetores = (event) => {
        const getSetorId = event.target.value;
        console.log(getSetorId)
        setSetorId(getSetorId);
    }

  return (
    <div className='salas'>
        <Sidebar/>

        <div className="salasContainer">
            <Navbar/>

            <div className="salasBoxForm">
                <h2>Cadastrar Nova Sala</h2>
                <form>
                <div className="form-group">
                    <label id="nome">Nome</label>
                    <input type="text" placeholder="Nome da sala" required onChange={e => setNome(e.target.value)} />
                </div>
                <div className="form-group">
                    <label id="andar">Andar</label>
                    <input type="text" placeholder="Andar da sala" required onChange={e => setAndar(e.target.value)} />
                </div>
                <div className="form-group">
                    <label id="dimensao">Dimensao</label>
                    <input type="text" placeholder="dimensao" required onChange={e => setDimensao(e.target.value)} />
                </div>
                <div className="form-group">
                        <label id="condensadora">Condensadora</label>
                        <select id="choose" required onChange={(e) => handleSetores(e)}>
                            <option>--Selecione Setores--</option>
                            {
                                setores.map((item) => ( <option key={item.id} value={item.id}> {item.codigo} </option>)   
                                )
                            }
                        </select>
                    </div>
                    <input type="submit" id='registrar' value="Registrar" onClick={handleAdd}/>
                </form>
            </div>
        </div>
    </div>
  )
}
