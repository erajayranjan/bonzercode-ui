import React, {useState, useEffect} from 'react';
import { getData, saveData , deleteData } from '../services/apiServices';

function Register(props) {
    const [user, setuser] = useState({
        id:'',
        name:'',
        dob:'',
        sex:'',
        email:'',
        password:'',
        error:'',
        subscribe:false
    });
    const [isRegistered, setisRegistered] = useState(true)

    const {id, name, dob, sex, email, password, error, subscribe}=user;

    useEffect(() => {
        // loadData(7);
        console.log("effect")
    }, [isRegistered]);

    const toggleForm=()=>{
        let regd=isRegistered;
        setisRegistered(!regd);
        setTimeout(() => {
            console.log(isRegistered)
        }, 2000);
    }

    const loadData=async (id=null)=>{
        let url="/";
        let method="GET";
        let params= {
            id:id,
            _limit: 6,
           }
        const res=await getData(url, method, null, params);
        setTimeout(() => {
            console.log(res);
        }, 3000);
    }

    const postData=async ()=>{
        let method="POST";
        let url="/auth/"+ (isRegistered ? 'login' : "register");
        let data={
            name: user.name,
            email: user.email,
            password: user.password,
        }
        let res;
        if(data.email && data.password){
            res=await saveData(url, data);
            setisRegistered(true);
            
            res && res.data && localStorage.setItem("token", res.data.token);
            // props.history.push("/");
            // console.log(token);
        }
    }

    const deleteRecord= async (id)=>{
        console.log("id>>>",id);
        const record= await deleteData("/user/8");
        console.log("recordDeleted>>>",record);
    }

    const handleChange=(event)=>{
        let {name, value, type}=event.target;
        value=type==='checkbox' ? event.target.checked : value;
        // setTimeout(() => {
        //     console.log(user);
        //     console.log(isRegistered)

        // }, 1000);
        setuser(Object.assign(user, {[name]:value}));
    }

    const handleSubmit=async ()=>{
        setTimeout(() => {
            // console.log("submitted>>>>>",user);
            postData();

        }, 1000);
    }

    const RegisterForm=()=>{
        return(
            <div className='w-64 bg-gray-100 h-1/2 p-4 mx-auto'>
                <h3 className="m-4">Create Account</h3>
                <input className="p-2 m-2" type="Text" name="name" defaultValue={ user.name } onChange={handleChange} placeholder="Enter name" />
                <input className="p-2 m-2" type="Text" name="email" defaultValue={ user.email } onChange={handleChange} placeholder="Enter email" />
                
                {/* <div>
                    <input type="radio" defaultChecked={user.sex==="male"} value="male" name="sex" onChange={handleChange} /> Male 
                    <input type="radio" defaultChecked={user.sex==="female"} value="female" name="sex" onChange={handleChange} /> female 
                    <input type="radio" defaultChecked={user.sex==="other"} value="other" name="sex" onChange={handleChange} /> other 
                </div> */}
                <input className="p-2 m-2" type="Text" name="password" defaultValue={ user.password } onChange={handleChange} placeholder="Enter password" />
                <input className="p-2 m-2" 
                    type="checkbox" 
                    name="subscribe" 
                    defaultChecked={user.subscribe} 
                    onChange={handleChange}  
                /><label>Subscribe</label>

                <button  className="px-2 py-1 m-2 bg-blue-700 text-blue-50 rounded-lg" onClick={handleSubmit} > Submit </button>
                <button onClick={toggleForm}>Already Registered Sign In</button>
            </div>
        );
    }

    const LoginForm=()=>{
        return(
            <div className='w-64 bg-gray-100 h-1/2 p-4 mx-auto'>
                <h3 className="m-4">Sign In</h3>   
                <input className="p-2 m-2" type="Text" name="email" defaultValue={ user.email } onChange={handleChange} placeholder="Enter email" />
                <input className="p-2 m-2" type="Text" name="password" defaultValue={ user.password } onChange={handleChange} placeholder="Enter password" />
                
                <button  className="px-2 py-1 m-2 bg-red-700 text-blue-50 rounded-lg" onClick={deleteRecord} > Delete </button>
                <button  className="px-2 py-1 m-2 bg-blue-700 text-blue-50 rounded-lg" onClick={handleSubmit} > Submit </button>
                
                <button onClick={toggleForm}>Not yet Registered! Sign Up</button>
            </div>
        );
    }

    return (
        <div>
            { 
            isRegistered ? <LoginForm /> :  <RegisterForm />
            }
        </div>
    )
}

export default Register
