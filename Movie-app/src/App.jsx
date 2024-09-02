import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import PageNotFound from './components/PageNotFound/PageNotFound';
import MovieDetail from './components/MovieDetail/MovieDetail';

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <div className="container">
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/movie/:imdbID' Component={MovieDetail} />
          <Route Component={PageNotFound} /> 
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
