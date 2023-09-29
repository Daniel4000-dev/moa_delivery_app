import {Route, Routes} from 'react-router-dom';
import { Login, Main } from './container';

function App() {

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center bg-white">
        
        <Routes>
          <Route path='/*' element={<Main />} />
          <Route path='/login' element={<Login />} />
        </Routes>
    </div>
  )
}

export default App
