import {Routes, Route, Outlet} from 'react-router-dom'
import React from 'react'
import {Home, Shorts, Subscriptions,} from './components/components'
import VideoScreen from './components/VideoScreen/organism/VideoScreen'
import NavBar from './components/GlobalComponents/molecule/Navbar'
import UploadScreen from './components/UploadScreen/organism/UploadScreen'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<NavBar sidebarVisibility children={<Outlet/>}/>}>
        <Route index element={<Home/>}/>
        <Route path='shorts' element={<Shorts/>}/>
        <Route path='subscriptions' element={<Subscriptions/>}/>
        <Route path='upload' element={<UploadScreen/>}/>
      </Route>
      <Route path='watch' element={<NavBar sidebarVisibility={false} children={<VideoScreen/>}/>}/>
    </Routes>
  )
}

export default AppRouter