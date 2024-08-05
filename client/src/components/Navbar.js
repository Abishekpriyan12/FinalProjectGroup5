import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import './Navbar.css';

const Navbar = () => (
  <div className="navbar">
    {/* Text instead of logo */}
    <div className="navbar-text">Employee Directory</div>
    
    {/* Navigation links on the right */}
    <div className="navbar-links">
      <Button as={Link} to="/" colorScheme="teal" variant="outline" className="navbar-link">
        Home
      </Button>
      <Button as={Link} to="/employees/all" colorScheme="teal" variant="outline" className="navbar-link">
        Employee List
      </Button>
      <Button as={Link} to="/create-employee" colorScheme="teal" variant="outline" className="navbar-link">
        Create Employee
      </Button>
    </div>
  </div>
);

export default Navbar;
