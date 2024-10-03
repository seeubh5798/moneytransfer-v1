import React, { useState } from 'react'
import { Appbar } from './subComponents/Appbar'
import { Balance } from './subComponents/Balance'
import { Users } from './subComponents/Users'
import { useLocation } from 'react-router-dom'

const Dashboard = () => {

    const {state} = useLocation();
    
  return (
    <div className="mx-8">
        <Appbar username={state.firstname} />
        <Balance value={state.balance}/>
        <Users userId={state.userId}/>
    </div>
  )
}

export default Dashboard