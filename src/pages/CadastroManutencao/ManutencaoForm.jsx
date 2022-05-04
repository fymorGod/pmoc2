import './manutencaoForm.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { app } from '../../api/app';
import AddIcon from '@mui/icons-material/Add';

export default function ManutencaoForm() {
    
    const [ data, setData ] = useState('');
    const [ tecnico, setTecnico ] = useState('');
    const [ custo, setCusto ] = useState('');
    const [ selectValue, setSelectValue ] = useState(1); // preventiva
    
    const [ condensadora, setCondensadora ] = useState([]);
    const [ condensadoraId, setCondensadoraId ] = useState('')
    
    const [ evaporadora, setEvaporadora ] = useState([]);
    const [ evaporadoraId, setEvaporadoraId ] = useState('')
    
    const [ item, setItem ] = useState([]); //item
    const [tarefas, setTarefas] = useState([]) // tarefas

    const [ itemsId, setItemsId ] = useState('')

    const [ desk, setDesk] = useState([]); //descricao
    const [ desk2, setDesk2] = useState([]); //item

    const optionTipo = [
        { id: 1, nome: 'preventiva' },
        { id: 2, nome: 'corretiva' }
    ];
   //const objeto = [];
    const listaTipo = [desk2]
    const listaDescricao = [desk]

    
    // for( let i=0; i < listaDescricao.length; i++){
    //     objeto[i] = [listaDescricao[i], listaTipo[i]]
    // }
    
    // console.log(objeto)
    

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
    uploadData.append( "status", "a executar")
    uploadData.append( "custo", custo)
    uploadData.append( "tec_responsavel", tecnico)
    uploadData.append("id_condensadora" , condensadoraId)
    uploadData.append("id_evaporadora", evaporadoraId)
    uploadData.append("previsao_termino", data)

    uploadData.append( "item", listaTipo)
    uploadData.append( "descricao", listaDescricao)

    function handleAdd() {
        app.post('/manutencoes', uploadData).then((response) => {
              console.log(response.data)
            
          }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });;
      }

      const uploadData2 = new FormData();
      uploadData2.append("tipo", selectValue)
      uploadData2.append("status", "a executar")
      uploadData2.append("custo", custo)
      uploadData2.append("tec_responsavel", tecnico)
      uploadData2.append("id_condensadora" , condensadoraId)
      uploadData2.append("id_evaporadora", evaporadoraId)
      uploadData2.append("previsao_termino", data)
  
      uploadData2.append( "item_array", itemsId)
      uploadData2.append( "descricao_array", listaDescricao)
  
      function handleAdd2() {
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
            .get("/itens")//rota de salas
            .then((response) => setItem(response.data))
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
        
        setItemsId(getTipoId);
        desk2[index] = getTipoId 
        setDesk2([...desk2])
        console.log(desk2)
    }
    
    const handleOnChangeItem = () => {
        app.get(`/tarefas/${item.id}`).then(res => {
            setTarefas(res.data)
        })
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


                    {
                          selectValue === 'preventiva' ?
                        <div className="form-group">
                        <label id="item">Item</label>
                        <select id="choose" required onChange={(e, index) => handleTipo(e, index)}>
                            <option>--Select Item--</option>
                            {
                                item.map((item) => (
                                    <option key={item.id} value={item.id}> {item.nome} </option>
                                ))
                            }
                        </select>
                        
                    </div> 
                    : null
                    }
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
                    
                    {
                        selectValue === 'corretiva' ? <div className="especial-div" style={{
                            display: 'flex',
                            justifyContent: 'center', 
                            alignItems: 'center'
                        }}>
                        {
                            desk.map((description, index) => (
                                <div key={index} className="form-group">
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
                                   <div className="form-group">
                                    <label id="item" htmlFor='choose'>Item</label>
                                    <select key={index} id="choose" onChange={(e) => handleTipo(e,index)}>
                                    <option>--Select Item--</option>
            
                                        {
                                            item.map((item) => (
                                                <option key={item.id} value={item.id}> {item.nome} </option>
                                            ))
                                        }
                                    </select>
                                   </div>
                                ))   
                            }
                           <div style={{
                               display: 'flex',
                               justifyContent: 'center',
                               alignItems: 'center',
                               marginTop: '5px',
                               marginLeft: '15px'
                           }}>
                                 <button style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100px',
                                    height: "40px",
                                    background: '#868686',
                                    border: '1px solid rgba(0,0,0, .3)',
                                    borderRadius: '4px',
                                    boxShadow: '2px 2px 2px rgba(0,0,0,.2)',
                                    cursor: 'pointer',
                                    
                                }} onClick={addInputButton}>
                                    <AddIcon style={{
                                        width: '15px',
                                        height: '15px',
                                        color: '#cecece'
                                    }}/>
                                </button>
                            </div>
                    </div> 
                    : null

                    }
                    
                            {
                                selectValue === 'corretiva' ? <input type="submit" value="Registrar" onClick={handleAdd}/> : <input type="submit" value="Registrar" onClick={handleAdd2}/>
                            }
                </form>
             
            </div>
        </div>
    </div>
  )
}
