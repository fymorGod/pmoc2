import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.scss';

export default function Home() {
  return (
    <div className='home'>
        <Sidebar/>
        <div className="homeContainer">
          <Navbar />
          Home container
        </div>
    </div>
  )
}
