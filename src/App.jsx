import { BrowserRouter, Route, Routes } from "react-router-dom"
import Equipamentos from "./pages/Equipamentos/Equipamentos";
import Equipamento from "./components/Equipamento/Equipamento";
import Home from "./pages/home/Home";
import Condensadora from "./pages/CadastroEquipamentos/Condensadora/Condensadora";
import Evaporadora from "./pages/CadastroEquipamentos/Evaporadora/Evaporadora";
import Cadastro from "./pages/CadastroEquipamentos/Cadastro/Cadastro";

import Salas from "./pages/CadastroSalas/Salas";
import ManutencaoForm from "./pages/CadastroManutencao/ManutencaoForm";
import './styles/dark.scss';

import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Manutencoes from "./pages/manutencoes/Manutencoes";
import Notifications from "./components/notifications/Notifications";
import Equipamentoform from "./pages/CadastroEquipamentos/Equipamento/Equipamentoform";
import EditarEquipamentoform from "./pages/Editar/Equipamento/EditarEquipamentoform";

function App() {
  const {darkMode} = useContext(DarkModeContext)

  return (
   <div className={ darkMode ? "app dark" : "app" }>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/equipamentos" element={<Equipamentos/>}/>
        <Route path="/manutencao" element={<Manutencoes/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/equipamentos/:id" element={<Equipamento/>}/>
        <Route path="/cadastrar" element={<Cadastro/>}/>
        <Route path="/cadastrar/sala" element={<Salas/>}/>
        <Route path="/cadastrar/manutencao" element={<ManutencaoForm/>}/>
        <Route path="/cadastrar/equipamento" element={<Equipamentoform/>}/>
        <Route path="/cadastrar/equipamento/evaporadora" element={<Evaporadora/>}/>

        <Route path="/editar/equipamento/:id" element={<EditarEquipamentoform/>}/>
        <Route path="/editar/equipamento/evaporadora" element={<Evaporadora/>}/>
        <Route path="/editar/equipamento/condensadora" element={<Condensadora/>}/>

        <Route path="/cadastrar/equipamento/condensadora" element={<Condensadora/>}/>
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
