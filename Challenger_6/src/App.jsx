import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import BooksPage from './pages/BooksPage'
import AtmPage from './pages/AtmPage'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/books" element={<PrivateRoute><BooksPage /></PrivateRoute>} />
      <Route path="/atm" element={<PrivateRoute><AtmPage /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}