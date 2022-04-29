import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.scss';

export default function Home() {
  return (
    <div className='home'>
        <Sidebar/>
        <div className="homeContainer">
          <Navbar />
          <div className="boxHome">
            <iframe title="Feedback Comercial" width="100%" height="920px" src="https://app.powerbi.com/view?r=eyJrIjoiZDBjZDg4ZDMtMDIzNi00MGI2LWJhYjctNGZmYjg0NWFkM2ExIiwidCI6IjFlNmE1ZmM0LTA3MmMtNGY2ZS1iZDM4LTNkMzEyZTMzMTM2NiJ9&pageName=ReportSectionf621ed76a1afe7c8fd75" frameborder="0" allowFullScreen="true"></iframe>
          </div>
        </div>
    </div>
  )
}
