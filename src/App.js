import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './Components/main';
import { AddRoomPage } from './Components/AddRoomPage';
import DeleteRoomPage from './Components/DeleteRoomPage';
import ErrorBoundary from './Components/ErrorBoundary';
import GenerateBillPage from './Components/GenerateBillPage';
import ViewRoomsPage from './Components/ViewRoomsPage';
import { WalkInReservationPage } from './Components/WalkInReservationPage';
import UpdateRoomPage from './Components/UpdateRoomPage';
import { GenerateInvoicePage } from './Components/GenerateInvoicePage';
import Login from './Components/Login';
import StaffDashboard from './Components/StaffDashboard';
import CustomerDashboard from './Components/CustomerDashboard';
import CreateAccount from './Components/CreateAccount';
import GuestBooking from './Components/GuestBooking';
import OnlineBooking from './Components/OnlineBooking';
import AddStaff from './Components/AddStaff';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" />} />
      <Route path="/main" element={<Main />} />
      <Route path='/AddRoomPage' element={<AddRoomPage/>}/>
      <Route path='/DeleteRoomPage' element={<DeleteRoomPage/>}/>
      <Route path='/errorBoundary' element={<ErrorBoundary/>}/>
      <Route path='/GenerateBillPage' element={<GenerateBillPage/>}/>
      <Route path='/GenerateInvoicePage' element={<GenerateInvoicePage/>}/>
      <Route path='/ViewRoomsPage' element={<ViewRoomsPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/UpdateRoomPage' element={<UpdateRoomPage/>}/>
      <Route path='/WalkInReservationPage' element={<WalkInReservationPage/>}/>
      <Route path='/CustomerDashboard' element={<CustomerDashboard/>}/>
      <Route path='/StaffDashboard' element={<StaffDashboard/>}/>
      <Route path='/CreateAccount' element={<CreateAccount/>}/>
      <Route path='/GuestBooking' element={<GuestBooking/>}/>
      <Route path='/OnlineBooking' element={<OnlineBooking/>}/>
      <Route path='/addStaff' element={<AddStaff/>}/>
      
    </Routes>
  );
}

export default App;