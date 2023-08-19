import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../component/Spinner'

const Chatroom = () => {
  return (
    <div>
        <div className="pt-4 pl-3">
            <Link to='/home'>
                <Button variant='outlined'>Back Home</Button>
            </Link>
        </div>
        <Spinner message={`HaHa !!!. patience is the key, Soon there will be a live chat here`} />
    </div>
  )
}

export default Chatroom