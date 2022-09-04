import React, {useState, useEffect} from 'react'
import { getData, saveData } from '../services/apiServices'
import {Link, useHistory } from 'react-router-dom';


function Home() {
const [authUser, setauthUser] = useState(null)

const getUser=async()=>{
    const user= await saveData("/auth");
    setauthUser(user);
}

const logOut=(props)=>{
    console.log("props",props)
    // props.history.push("/register")
    localStorage.removeItem('token');
    window.location.reload()
}

useEffect(() => {
    checkUser();
}, [])

const checkUser=async() =>{
    let url="/auth/";
    let method="GET";
    let params={};
    const res=await getData(url, method, null, params);
    console.log('ressHome>>', res.data.user);
    setauthUser(res.data.user)
}

    return (
        <div>
           <h3>Home</h3> 
           <h4>{authUser && ("Welcome " +authUser.name)}</h4>
          {authUser &&  <button onClick={logOut}>Logout</button>}
        </div>
    )
}

export default Home
