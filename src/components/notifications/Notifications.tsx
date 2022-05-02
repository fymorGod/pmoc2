import { app } from "../../api/app";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import './notifications.scss';

type Notifications = {
    
}

export default function Notifications() {

    async function notifications() {
        try {
            const response = await app.get('/manutencoes');
            console.log(response.data)
        }
        catch (err) {
            console.log('Error: ', err)
        }
    }

  return (
    <div className="notifications">
        <Sidebar />

        <div className="notificationsContainer">
            <Navbar />

            <div className="boxContainerNoti">

                <div className="containerNoti">
                    <h2>Notifications</h2>
                </div>
            </div>
        </div>
    </div>
  )
}
