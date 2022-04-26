import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import './condensadora.scss';
import { useEffect, useState } from "react";
import { app } from "../../../api/app";

export default function Condensadora() {
  const [selectValue, setSelectValue] = useState(1);
  const [codigo, setCodigo] = useState();
  const [modelo, setModelo] = useState();
  const [modulo, setModulo] = useState();
  const [local_instalacao, setLocal_instalacao] = useState();
  const [quadro, setQuadro] = useState();
  const [file, setFile] = useState();

  const optionStatus = [
      { id: 1, nome: 'normal' },
      { id: 2, nome: 'defeito' }
  ];
  function handleAdd() {
    app.post('/condensadoras', {            
        "codigo": codigo,
        "modelo": modelo,
        "status": selectValue,
        "modulo": modulo,
        "quadro": quadro,
        "local_instalacao": local_instalacao,
        "file": file
      }).then((response) => {
          console.log(response.data)
      });
  }
  
  return (
    <div className='condensadora'>
        <Sidebar />
        <div className="condensadoraContainer">
          <Navbar />

          <div className="boxCondensaForm">
            <h2>Cadastrar Condensadora</h2>
            <form>
                    <div className="form-group">
                        <label htmlFor="codigo">Código</label>
                        <input type="text" placeholder="CON001" required onChange={e => setCodigo(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="modulo">Módulo</label>
                        <input type="text" placeholder="módulo"  onChange={e => setModulo(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="local">Local da Instalação</label>
                        <input type="text" placeholder="local" onChange={e => setLocal_instalacao(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="modelo">Modelo</label>
                        <input type="text" placeholder="Modelo" onChange={e => setModelo(e.target.value)}  />
                    </div>
                    <div className="form-group">
                        <label id="status">Status</label>
                        <select id="choose" value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                        <option>--Select Status--</option>

                            {
                                optionStatus.map((item) => (
                                    <option key={item.id} value={item.nome}> {item.nome} </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quadro">Quadro</label>
                        <input type="text" placeholder="Quadro"  onChange={e => setQuadro(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="arquivo" id="file">Nota fiscal</label>
                        <input type="file" name="arquivo" id="arquivo" onChange={e => setFile(e.target.files[0])} />
                    </div>
                    <input type="submit" value="Registrar" onClick={handleAdd}/>
                </form>
          </div>

        </div>
    </div>
  )
}
