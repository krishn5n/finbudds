import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Signin from './Pages/Signin';
import Layout from './Pages/Layout'
import Welcome from './Pages/Welcome';
import Signup from './Pages/Signup';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
