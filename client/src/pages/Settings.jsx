import React from 'react'
import Spinner from '../component/Spinner'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Settings = () => {
  return (
    
    <div>
        <div className="pt-4 pl-3">
            <Link to='/home'>
                <Button variant='outlined'>Back Home</Button>
            </Link>
        </div>
        <Spinner message={`Developers are still working at this page to improve the website. Thank You`} />
    </div>
  )
}

export default Settings