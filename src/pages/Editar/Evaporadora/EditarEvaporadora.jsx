import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import './evaporadora.scss';
import { app } from "../../../api/app";
import { useEffect, useState } from "react";

export default function Evaporadora() {
  const [salas, setSalas] = useState([]);
  const [ salasId, setSalasId] = useState('')
  
  const [codigo, setCodigo] = useState('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [potencia, setPotencia] = useState('');
  const [quadro, setQuadro] = useState('');
  const [file, setFile] = useState();


  const [selectValue, setSelectValue] = useState(1);

  const optionStatus = [
      {id: 1, nome: 'normal'}, 
      {id: 2, nome: 'defeito'}
  ];
  

  useEffect(() => {
      app
        .get("/salas")//rota de salas
        .then((response) => setSalas(response.data))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);
    const uploadData = new FormData();
    uploadData.append("codigo", codigo)
    uploadData.append("modelo", modelo)
    uploadData.append("marca", marca)
    uploadData.append("id_sala", salasId)
    uploadData.append("status", selectValue)
    uploadData.append("potencia", potencia)
    uploadData.append("quadro", quadro)
    uploadData.append("file", file)

    async function handleAdd() {
      try {
        await app.put('/evaporadoras', uploadData).then((response) => {
            console.log(response.data)
        });
        window.alert('deu certo');          
      } catch (error) {
        window.alert(error)
      }
    }

    const handleSala = (event) => {
      const getCondensaId = event.target.value;
      console.log(getCondensaId)
      setSalasId(getCondensaId);
  }

  return (
    <div className="evaporadora"> 
      <Sidebar />
      <div className="evaporadoraContainer">
        <Navbar />
        
        <div className="evaporadoraFormBox">
        <h2>Cadastrar Evaporadora</h2>
                <form>
                    <div className="form-group">
                        <label id="codigo">C??digo</label>
                        <input type="text" placeholder="ARC001" required onChange={e => setCodigo(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label id="sala">Sala</label>
                        <select id="choose" required onChange={e => handleSala(e)}>
                        <option>--Select Sala--</option>

                            {
                                salas.map((item)=> (
                                    <option key={item.id} value={item.id}> {item.nome} </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label id="modelo">Modelo</label>
                        <input type="text" placeholder='Modelo'  onChange={e => setModelo(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label id="marca">Marca</label>
                        <input type="text" placeholder="Marca" onChange={e => setMarca(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label id="potencia">Pot??ncia (BTU)</label>
                        <input type="text" placeholder="Pot??ncia " required onChange={e => setPotencia(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label id="quadro">Quadro</label>
                        <input type="text" placeholder="Quadro" onChange={e => setQuadro(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label id="status">Status</label>
                        <select id="choose" value={selectValue} required onChange={e => setSelectValue(e.target.value)}>
                            {
                                optionStatus.map((item)=> (
                                    <option key={item.id} value={item.nome}> {item.nome} </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label id="file" htmlFor='arquivo'>Nota fiscal</label>
                        <input type="file" name="arquivo" id="arquivo" onChange={e => setFile(e.target.files[0])} />
                    </div>
                    <input type="submit" id='registrar' value="Registrar" onClick={() => handleAdd()}/>

                </form>
        </div>
      </div>
    </div>
  )
}
