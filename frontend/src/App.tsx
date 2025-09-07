import { Route, Routes } from 'react-router-dom';
import DashBoard from './pages/Dashboard';
import Signin from './pages/SignIn';
import Signup from './pages/SignUp';
import SharedBrain from './pages/SharedBrain';
import Home from './pages/Home';

const App = () => {
  return (
    <div className='dark:bg-slate-900 h-screen'>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/dashboard' element={<DashBoard/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/shared/:shareId' element={<SharedBrain/>} />
    </Routes>
    </div>
  )
}

export default App
