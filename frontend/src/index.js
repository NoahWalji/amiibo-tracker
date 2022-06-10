import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './index.css';
import App from './App';
import Explore from './pages/Explore';
import ExploreType from './pages/ExploreType';
import DisplayType from './pages/DisplayType';
import ItemPage from './pages/ItemPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Collection from './pages/Collection';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
          <Route exact path="/amiibo/:id" element={<ItemPage/>}/>
          <Route exact path="/explore/series" element={<ExploreType type="Series"/>}/>
          <Route exact path="/explore/franchises" element={<ExploreType type="Franchises"/>}/>
          <Route exact path="/explore/series/:id" element={<DisplayType type="Series"/>}/>
          <Route exact path="/explore/franchises/:id" element={<DisplayType type="Franchises"/>}/>
          <Route exact path="/explore" element={<Explore/>}/>
          <Route exact path="/collection" element={<Collection/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/" element={<App/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

