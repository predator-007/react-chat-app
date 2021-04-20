import React, { useEffect, useState }from 'react';
import { useDispatch, useSelector } from "react-redux";
import './searchbar.css';

const Searchbar:React.FC = () => {
    return (
      <input 
       className="Searchbar"
       placeholder="Search"
        
      />
    );
  }
  
  export default Searchbar;