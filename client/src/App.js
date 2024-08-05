import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeDetails from './components/EmployeeDetails';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EmployeeDirectory />} />
        <Route path="/employees/:type" element={<EmployeeList />} />
        <Route path="/create-employee" element={<EmployeeCreate />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
      </Routes>
    </Router>
  </ApolloProvider>
);

export default App;
