import React from 'react'
import Header from '../Components/Header'
import DashboardBody from '../Components/DashboardBody'

const Dashboard = () => {

 
  return (
    <>
    <Header isSignIn={true} />
    <DashboardBody/>
    </>
  )
}

export default Dashboard