import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import ConstructionIcon from '@mui/icons-material/Construction';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';

export default function Sidebar() {
  const { dispatch } = useContext(DarkModeContext)

  return (
    <div className='sidebar'>
      <div className="top">
        <span className='logo'>PMOC</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li>
          <DashboardIcon className='icon'/>
          <span><Link to="/">Dashboard</Link></span>
          </li>
          <p className="title">Lists</p>
          <li>
            <ConstructionIcon className="icon"/>
            <span><Link to="/equipamentos">Equipamentos</Link></span>
            </li>
          <li>
            <AddIcon className="icon"/>
            <span><Link to="/cadastrar">Cadastrar Equipamentos</Link></span>
            </li>
          <li>
            <AddIcon className="icon" />
            <span><Link to="/cadastrar/sala">Cadastrar Salas</Link></span>
            </li>
            <li>
            <AddIcon className="icon"/>
            <span><Link to="/cadastrar/manutencao">Cadastrar Manutenções</Link></span>
            </li>
            <p className="title">Userful</p>
            <li>
            <NotificationsNoneIcon className="icon"/>
            <span><Link to="/notifications">Notificações</Link></span>
            </li>
            <p className="title">Service</p>
            <li>
              <SettingsIcon className="icon"/>
            <span><Link to="/manutencao">Manutenções</Link></span>
            </li>
            <p className="title">User</p>
            <li> 
              <PersonOutlineIcon className="icon"/>
            <span><Link to="/profile">Profile</Link></span>
            </li>
            <li>
            <LogoutIcon className="icon"/>
            <span>Logout</span>
            </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={()=> dispatch({type: "LIGHT"})}></div>
        <div className="colorOption" onClick={()=> dispatch({type: "DARK"})}></div>
      </div>
    </div>
  )
}
