import './App.css';
import Layout from './Registration/Layout';
import Login from './Registration/Login';
import Signup from './Registration/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Protect the admin route */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
