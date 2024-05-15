import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';

import './app.css';
import './index.css';

import SignUp from './Auth/SignUp.jsx';
import Achivement from './pages/Admin/Achivement.jsx';
import Coatch from './pages/Admin/Coatch';
import Equipment from './pages/Admin/Equipment';
import Sport from './pages/Admin/Sport';
import AdminHome from './pages/Admin/AdminHome.jsx';
import Shedule from './pages/Admin/Shedule';
import Score from './pages/Admin/Score';
import Home from './pages/User/Home.jsx';

import UserScore from './pages/User/Score.jsx';
import UserCoach from './pages/User/Coatch.jsx';
// import UserShedule from './pages/User/Shedule.jsx';
import UserEquipment from './pages/User/Equipment.jsx';
import Inventory from './pages/Admin/Reservation.jsx';



function App() {


  return (

    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />}></Route>
        <Route path='/admin/login' element={<Login />}></Route>
        <Route path='/admin/register' element={<SignUp />}></Route>

        <Route path='/admin/home' element={<AdminHome />}></Route>
        <Route path='/admin/achivement' element={<Achivement />} />
        <Route path='/admin/coach' element={<Coatch />} />
        <Route path='/admin/equipment' element={<Equipment />} />
        <Route path='/admin/sport' element={<Sport />} />
        <Route path='/admin/shedule' element={<Shedule />} />
        <Route path='/admin/score' element={<Score />} />
        <Route path='/admin/reservation' element={<Inventory />} />

        <Route path='/user/uov-score' element={<UserScore />} />
        <Route path='/user/uov-coach' element={<UserCoach />} />
       {/* <Route path='/user/uov-shedule' element={<UserShedule />} /> */}
        <Route path='/user/uov-equepments' element={<UserEquipment />} />

      </Routes>

    </BrowserRouter>



  )
}


export default App;
