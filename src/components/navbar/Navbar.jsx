import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import imageLogin from "../../assets/user.png";
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

export default function Navbar() {
  const { dispatch } = useContext(DarkModeContext)
  return (
    <div className='navbar'>
      <div className="wrapper">
       
        <div className="search">
          <input type="text" placeholder='Seach...'/>
          <SearchOutlinedIcon className='icon'/>
        </div>        
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon className='icon' onClick={() => dispatch({type: "TOGGLE"})}/>
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className='icon'/>
            <div className="counter">
              1
            </div>
          </div>
          <div className="item">
            <img className="avatar" src={imageLogin} alt="image login" width="30px" height="30px"/>
          </div>
        </div>
      </div>
    </div>
  )
}
