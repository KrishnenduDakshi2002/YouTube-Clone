import {Routes, Route, Outlet} from 'react-router-dom'
import React from 'react'
import {Home, Shorts, Subscriptions,} from './components/components'
import VideoScreen from './components/VideoScreen'
import NavBar from './Navbar'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<NavBar sidebarVisibility children={<Outlet/>}/>}>
        <Route index element={<Home/>}/>
        <Route path='shorts' element={<Shorts/>}/>
        <Route path='subscriptions' element={<Subscriptions/>}/>
      </Route>
      <Route path='watch' element={<NavBar sidebarVisibility={false} children={<VideoScreen/>}/>}/>
    </Routes>
  )
}

export default AppRouter