
import { useEffect, useState } from 'react';
import { app } from '../../../api/app';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import './equipamentoform.scss';

export default function Equipamentoform() {
    const optionStatus = [
        { id: 1, nome: 'normal' },
        { id: 2, nome: 'defeito' }
    ];
  const [selectValue, setSelectValue] = useState(1);

  const [tipo, setTipo] = useState('');
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

  function handleAdd() {
      app.post('/equipamentos', {
          "tipo": tipo,
          "linha": linha,            
          "id_condensadora": condensadoraId,
          "id_evaporadora": evaporadoraId
      }).then((response) => {
          console.log(response.data)
          setCondensadora(response.data)
          setEvaporadora(response.data)
      });
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
                        <label id="tipo">Tipo do Equipamento</label>
                        <input type="text" placeholder="tipo" required onChange={e => setTipo(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label id="linha">Linha</label>
                        <input type="text" placeholder="linha" onChange={e => setLinha(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label id="condensadora">Condensadora</label>
                        <select id="choose" required onChange={(e) => handleCondensadora(e)}>
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
                    <input type="submit" id='registrar' value="Registrar" onClick={handleAdd}/>
                </form>
            </div>
        </div>
    </div>
  )
}
