import './manutencaoForm.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { app } from '../../api/app';

export default function ManutencaoForm() {
    
    const [ data, setData ] = useState('');
    const [ tecnico, setTecnico ] = useState('');
    const [ custo, setCusto ] = useState('');
    const [ selectValue, setSelectValue ] = useState(1); // preventiva
    const [ selectValueFrequencia, setSelectValueFrequencia ] = useState(1); // frequencia
    
    const [ condensadora, setCondensadora ] = useState([]);
    const [ condensadoraId, setCondensadoraId ] = useState('')
    
    const [ evaporadora, setEvaporadora ] = useState([]);
    const [ evaporadoraId, setEvaporadoraId ] = useState('')
    
    const [tarefas, setTarefas] = useState([])
    const [ tarefasId, setTarefasId ] = useState('')

    const [ desk, setDesk] = useState([]); //descricao
    const [ desk2, setDesk2] = useState([]); //item


    const optionFrequencia = [
        { id: 1, nome: 'mensal' },
        { id: 2, nome: 'trimestral' },
        { id: 3, nome: 'semestral' }
    ];
    const optionTipo = [
        { id: 1, nome: 'preventivo' },
        { id: 2, nome: 'corretiva' }
    ];
    const objeto = [];
    const listaTipo = [desk2]
    const listaDescricao = [desk]

    
    for( let i=0; i < listaDescricao.length; i++){
        objeto[i] = [listaDescricao[i], listaTipo[i]]
    }
    
    console.log(objeto)
    

    const addInputButton = (e) => {
        e.preventDefault();

        setDesk([...desk, ""])
        setDesk2([...desk2, ""])
    }

    const handleChangeDescription = (e, index) => {
        desk[index] = e.target.value;
        setDesk([...desk])
        console.log(desk)
    }
    const uploadData = new FormData();
    uploadData.append("tipo", selectValue)
    uploadData.append("frequencia", selectValueFrequencia)
    uploadData.append("descricao", "lala")
    uploadData.append( "status", "a executar")
    uploadData.append( "custo", custo)
    uploadData.append( "tec_responsavel", tecnico)
    uploadData.append("id_condensadora" , condensadoraId)
    uploadData.append("id_evaporadora", evaporadoraId)
    uploadData.append("previsao_termino", data)
    uploadData.append( "tanto_faz", objeto)

    function handleAdd() {
        app.post('/manutencoes', uploadData).then((response) => {
              console.log(response.data)
            
          }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });;
      }

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
    useEffect(() => {
        app
            .get("/tarefas")//rota de salas
            .then((response) => setTarefas(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);
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
    const handleTipo = (event, index) => {
        console.log(index)
        const getTipoId = event.target.value;
        console.log(getTipoId)
        setTarefasId(getTipoId);
        desk2[index] = getTipoId 
        setDesk2([...desk2])
        console.log(desk2)
    }
    

  return (
    <div className='manutencaoForm'>
        <Sidebar />

        <div className="manutencaoFormContainer"> 
            <Navbar />

            <div className="boxFormManutencao">
            <h2>Cadastrar Manutenção</h2>
                <form>
                    <div className="form-group">
                        <label id="tipo">Tipo</label>
                        <select id="choose" value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                        <option>--Select Tipo--</option>
                           
                            {
                                optionTipo.map((item) => (
                                    <option key={item.id} value={item.nome}> {item.nome} </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tecnico">Técnico</label>
                        <input type="text" placeholder="técnico"  onChange={e => setTecnico(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="custo">Custo</label>
                        <input type="text" placeholder="custo" onChange={e => setCusto(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="data">Previsão de Entrega</label>
                        <input type="date" onChange={e => setData(e.target.value)} />
                    </div>
                    {
                        selectValue == "preventivo" ? <div className="form-group">
                        <label id="frequencia">Frequência</label>
                        <select id="choose" value={selectValueFrequencia} onChange={e => setSelectValueFrequencia(e.target.value)}>
                        <option>--Select Frequência--</option>
                            
                            {
                                optionFrequencia.map((item) => (
                                    <option key={item.id} value={item.nome}> {item.nome} </option>
                                ))
                            }
                        </select>
                    </div> : null
                    }
                    
                    <div className="form-group">
                        <label id="condensadora">Condensadora</label>
                        <select id="choose"  onChange={(e) => handleCondensadora(e)}>
                            <option>--Select Condensadora--</option>
                            {
                                condensadora.map((item) => ( <option key={item.id} value={item.id}> {item.codigo} </option>)   
                                )
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label id="evaporadora">Evaporadora</label>
                        <select id="choose" onChange={(e) => handleEvaporadora(e)}>
                        <option>--Select Evaporadora--</option>

                            {
                                evaporadora.map((item) => (
                                    <option key={item.id} value={item.id}> {item.codigo} </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        {
                            desk.map((description, index) => (
                                <div key={index}>
                                    <label htmlFor={`descricao-${index+1}`}>Descrição</label>
                                    <input type="text"
                                    id={`descricao-${index+1}`} 
                                    value={description}
                                    placeholder="Description"
                                    onChange={(e) => handleChangeDescription(e, index)}
                                    />
                            
                                </div>
                                
                            ))
                            
                        }
                            {
                                desk2.map((x2, index) => (
                                    <select key={index} id="choose" onChange={(e) => handleTipo(e,index)}>
                                    <option>--Select Tipo--</option>
            
                                        {
                                            tarefas.map((item) => (
                                                <option key={item.id} value={item.id}> {item.item} </option>
                                            ))
                                        }
                                    </select>
                                ))   
                            }
                           <div>
                                 <button style={{width: '100px', height: "30px"}} onClick={addInputButton}>+</button>
                            </div>
                    </div>
                    <input type="submit" value="Registrar" onClick={handleAdd}/>

                </form>
             
            </div>
        </div>
    </div>
  )
}
