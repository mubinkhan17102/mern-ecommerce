import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-sky-600'>
      <ul className='flex list-none'>
        <li>
          <Link to='/'>
            <span className='p-5 block'>Home</span>
          </Link>
        </li>
        <li>
          <Link to='/about'>
          <span className='p-5 block'>About</span>
          </Link>
        </li>
        <li>
          <Link to='/cart'>
          <span className='p-5 block'>Cart</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar