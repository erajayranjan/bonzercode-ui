import React, {useState, useEffect} from 'react'
import { getData, saveData } from '../services/apiServices'
import {Link, useHistory } from 'react-router-dom';


function Home() {

    return (
        <div>
           <h3>Home</h3> 
            <Link to="/about">About</Link>
            <Link to="/register">Register</Link>

        </div>
    )
}

export default Home
