import { useEffect, useState } from 'react';
import { app } from '../../../api/app';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import './equipamentoform.scss';

export default function Equipamentoform() {
    const optionStatus = [
        { id: 1, nome: 'SPLIT' },
        { id: 2, nome: 'VRF' }
    ];
  const [selectValue, setSelectValue] = useState(1);

  
  const [linha, setLinha] = useState('');

  const [condensadora, setCondensadora] = useState([]);
  const [ condensadoraId, setCondensadoraId] = useState('')

  const [evaporadora, setEvaporadora] = useState([]);
  const [ evaporadoraId, setEvaporadoraId] = useState('')

  useEffect(() => {
      app
          .get("/condensadoras")//rota de salas
          .then((response) => setCondensadora(response.data))
          .catch((err) => {
              console.error("ops! ocorreu um erro" + err);
          });
  }, []);

  useEffect(() => {
      app
          .get("/evaporadoras")//rota de salas
          .then((response) => setEvaporadora(response.data))
          .catch((err) => {
              console.error("ops! ocorreu um erro" + err);
          });
  }, []);

  async function handleAdd() {
      try {
        await app.post('/equipamentos', {
            "tipo": selectValue,
            "linha": linha,            
            "id_condensadora": condensadoraId,
            "id_evaporadora": evaporadoraId
        })
        alert('Equipamento criado com sucesso')
      }
      catch (err) {
        console.log(err)
      }
  }

  const handleCondensadora = (event) => {
      const getCondensaId = event.target.value;
      console.log(getCondensaId)
      setCondensadoraId(getCondensaId);
  }

  const handleEvaporadora = (event) => {
      const getEvapoId = event.target.value;
      console.log(getEvapoId)
      setEvaporadoraId(getEvapoId);
  }

  return (
    <div className='equipamentoForm'>
        <Sidebar/>
        <div className="equipamentoFormContainer">
            <Navbar/>
            
            <div className="equipamentoFormBox">
            <h2>Cadastrar Equipamento</h2>
                <form>
                    <div className="form-group">
                        <label id="status">Tipo</label>
                        <select id="choose" value={selectValue} required onChange={e => setSelectValue(e.target.value)}>
                            <option>--Select Tipo--</option>
                            {
                                optionStatus.map((item)=> (
                                    <option key={item.id} value={item.nome}> {item.nome} </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label id="linha">Linha</label>
                        <input type="text" placeholder="linha" onChange={e => setLinha(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label id="condensadora">Condensadora</label>
                        <select id="choose" onChange={(e) => handleCondensadora(e)}>
                            <option>--Select Condensadora--</option>
                            {
                                condensadora.map((item) => ( <option key={item.id} value={item.id}> {item.codigo} </option>)   
                                )
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label id="evaporadora">Evaporadora</label>
                        <select id="choose" required onChange={(e) => handleEvaporadora(e)}>
                        <option>--Select Evaporadora--</option>

                            {
                                evaporadora.map((item) => (
                                    <option key={item.id} value={item.id}> {item.codigo} </option>
                                ))
                            }
                        </select>
                    </div>
                    <input type="submit" id='registrar' value="Registrar" onClick={() => handleAdd()}/>
                </form>
            </div>
        </div>
    </div>
  )
}
