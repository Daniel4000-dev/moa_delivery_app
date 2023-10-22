import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DbHeader from './DbHeader'
import DbHome from './DbHome'
import DbItems from './DbItems'
import DbNewItems from './DbNewItems'
import DbOrders from './DbOrders'
import DbUsers from './DbUsers'

const DBRIGHTSECTION = () => {
  return (
    <div className='flex flex-col py-12 px-12 flex-1 h-full'>
        <DbHeader />
        <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none'>
          <Routes>
            <Route path='/home' element={<DbHome />} />
            <Route path='/orders' element={<DbOrders/>} />
            <Route path='/items' element={<DbItems />} />
            <Route path='/newItem' element={<DbNewItems />} />
            <Route path='/users' element={<DbUsers />} />
          </Routes>
        </div>
    </div>
  )
}

export default DBRIGHTSECTION