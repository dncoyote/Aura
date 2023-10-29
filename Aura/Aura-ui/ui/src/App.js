import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Sidenav from './components/Sidenav';
import Home from './pages/Home';
import HomeBanner from './components/HomeBanner';

function App() {
  return (
    <div className="App">
      
      <Sidenav/>
      <Navbar/>
      <main>
      <Routes>
        <Route  path="/" element={<Home />}/>
        {/* <Route path="/explore" element={<Explore />} />
        <Route path="/statistics" element={<Statistics />}/> */}
      </Routes>
      </main>
      <HomeBanner/>
      {/* <Home/> */}
    </div>

    
  );
}

export default App;