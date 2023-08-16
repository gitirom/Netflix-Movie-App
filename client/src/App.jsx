import './app.scss';
import Home from "./pages/home/Home";
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import Login from './pages/Login/Login';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useContext } from 'react';
import {AuthContext} from "./authContext/AuthContext";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const {user} = useContext(AuthContext) ; //this var.. just to put a condition if user go Home else go register
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={ user ? <Home/> : <Register />} />
          <Route exact path="/register" element={!user ? <Register/> : <Home />} />
          <Route exact path="/login" element={!user ? <Login/> : <Home />} />
          {user && (
            <>
            <Route path="/movies" element={<Home type="movie" />} />  {/*Now how can i know if the home page is for movies or series == should pass the type in route compo..*/}
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch" element={<Watch />} />
            </>
          )}
        </Routes>
      </Router>
      <ToastContainer                                                              //React-Toastify allows you to add notifications to your app with ease. No more nonsense!
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </>
  );
};

export default App;