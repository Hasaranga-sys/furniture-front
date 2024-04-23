import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Outlet, useRoutes, Route, Routes } from 'react-router-dom';
import UploadImage from './components/UploadImage';
import ViewResults from './components/ViewResults';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UploadImage/>}/>
          <Route path="/viewResults" element={<ViewResults/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
