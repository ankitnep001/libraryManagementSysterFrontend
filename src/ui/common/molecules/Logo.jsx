import React from 'react'
import { Link } from 'react-router-dom'
import { image } from '../../../config/constant/image'

const Logo = () => {
    return (
        <Link to='/home'>
            <img className='h-30 w-30' src={image.logo} alt="" />
        </Link>
    )
}

export default Logo
