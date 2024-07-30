import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import Booking from '../pages/Booking';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoutes from '../utils/ProtectedRoutes';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/booking" Component={Booking}></Route>
          <Route path="/login" Component={Login}></Route>
          <Route path="/signup" Component={Signup}></Route>
          <Route Component={ProtectedRoutes}>
            <Route path="/admin" Component={Admin}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;