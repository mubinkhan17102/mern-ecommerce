import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Cart from './components/Cart'

export default function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/about' element = {<About/>} />
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </>
  )
}