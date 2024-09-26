import React from 'react'
import { Appbar } from './subComponents/Appbar'
import { Balance } from './subComponents/Balance'
import { Users } from './subComponents/Users'

const Dashboard = () => {
  return (
    <div>
        <Appbar username={"shubham"} />
        <Balance value={2000}/>
        <Users />
    </div>
  )
}

export default Dashboard