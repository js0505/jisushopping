import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Container } from 'react-bootstrap'
import { Header, Footer } from './Components'
import { HomeScreen, ProductScreen, CartScreen } from './Screens'
// import HomeScreen from './Screens/HomeScreen';
// import ProductScreen from './Screens/ProductScreen';
// import CartScreen from './Screens/CartScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/cart' component={CartScreen} exact />
          <Route path='/product/:id' component={ProductScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;