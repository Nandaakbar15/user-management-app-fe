import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import DashboardPages from './dashboard/Dashboard'
import IndexUserPages from './dashboard/User/IndexUser'
import TambahUserPages from './dashboard/User/TambahUser/TambahUser'
import EditUserPages from './dashboard/User/Edituser/EditUser'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/dashboard" replace/>}></Route>
          <Route path='/dashboard' element={<DashboardPages/>}></Route>
          <Route path='/user-list' element={<IndexUserPages/>}></Route>
          <Route path='/add-user' element={<TambahUserPages/>}></Route>
          <Route path='/update-user/:id' element={<EditUserPages/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
