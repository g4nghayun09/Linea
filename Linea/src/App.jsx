import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './login.jsx'
import Signup from './signup.jsx'
import Settlement from './settlemen.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/settlement" element={<Settlement />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App