import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Container } from 'react-bootstrap'
import { Header, Footer } from './Components'
import {
  HomeScreen,
  ProductScreen,
  CartScreen,
  LoginScreen,
  SignupScreen,
  ProfileScreen,
  UploadProductScreen
} from './Screens'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/cart' component={CartScreen} exact />
          <Route path='/product/:id' component={ProductScreen} exact />
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/signup' component={SignupScreen} exact />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/upload' component={UploadProductScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;