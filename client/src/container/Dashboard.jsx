import React from 'react'
import { DBLEFTSECTION, DBRIGHTSECTION } from '../components'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen flex items-center bg-primary'>
        <DBLEFTSECTION />
        <DBRIGHTSECTION />
    </div>
  )
}

export default Dashboard