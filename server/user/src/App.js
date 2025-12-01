import './App.css';
import {useState} from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Header from './component/header.js';
import Footer from './component/footer.js';
import Home from './pages/home.js';
import About from './pages/about.js';
import Countries from './pages/countries.js';
import Contact from './pages/contact.js';
import Service from './pages/service.js';
import Register from './pages/register.js';
import Login from './pages/login';
import Forgot from './pages/forgot';
import AddService from './pages/addservice';


function App() {
  return (
    <div>
            <Router>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/countries' element={<Countries/>}/>
          <Route exact path='/service' element={<Service/>}/>
          <Route exact path='/contact' element={<Contact/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/forgot' element={<Forgot/>}/>
          <Route exact path='/addservice' element={<AddService/>}/>

        </Routes>
        <Footer/>
      </Router>
  

    </div>
  );
}

export default App;
