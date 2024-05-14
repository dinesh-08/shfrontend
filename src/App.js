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
import Viewmybookinghistory from './Components/Viewmybookinghistory';
import Staffbooking from './Components/Staffbooking';
import Viewbookinghistory from './Components/Viewbookinghistory';
import Viewbookings from './Components/Viewbookings';
import Feedback from 'react-bootstrap/esm/Feedback';
import Feedbackform from './Components/Feedbackform';
import Billsandinvoice from './Components/Billsandinvoice';
import Report from './Components/Report';
import ViewGuestBookings from './Components/ViewGuestBookings'


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
      <Route path='/viewmybookinghistory' element={<Viewmybookinghistory/>}/>
      <Route path='/Viewbookinghistory' element={<Viewbookinghistory/>}/>
      <Route path='/staffbooking' element={<Staffbooking/>}/>
      <Route path='/viewbookings' element={<Viewbookings/>}/>
      <Route path='/feedbackform' element={<Feedbackform/>}/>
      <Route path='/Billsandinvoice' element={<Billsandinvoice/>}/>
      <Route path='/Report' element={<Report/>}/>
      <Route path='/ViewGuestBookings' element={<ViewGuestBookings/>}/>
      
    </Routes>
  );
}

export default App;