import './App.css';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import {BrowserRouter as Router} from "react-router-dom"
import WebFont from 'webfontloader'
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    })
  }, []);
  return (
    <Router>
      <Header/>
      <Footer/>
    </Router>
  );
}

export default App;
