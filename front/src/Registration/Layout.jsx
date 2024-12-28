import SideBar from '../sidebar/SideBar'
import JobPostForm from '../components/PostJob'
import AdminPostList from '../components/AdminPostList'
import { Route, Routes } from 'react-router-dom'
import ApplicationList from '../components/ApplicationList'
import UserPostList from '../user/UserPostList '

const Layout = () => {
  return (
    <>
    <div className='w-full h-full flex'>
        <SideBar/>
        <Routes>
            <Route  index element={<JobPostForm/>} />
            <Route  path="/adminpost" element={<AdminPostList/>} />
            <Route  path="/application" element={<ApplicationList/>} />
            <Route  path="/user" element={<UserPostList/>} />


        </Routes>
      
    </div>

    </>
  )
}

export default Layout