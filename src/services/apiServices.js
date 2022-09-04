import axios from 'axios'

// this is a config for Axios so that we need not to pass full URL instead will pass relative url
var authToken=localStorage.getItem('token')!=null ? `Bearer ${localStorage.getItem('token')}` : null;
const apiCall = axios.create({  
    baseURL: 'https://bonzercode-api.herokuapp.com',
    timeout: 3000,
    headers: {
        "Content-Type" : "application/json",
        'authorization': authToken,
    }
  });

// To get Data of in full or a single record
export const getData=async (url, method="GET", data=null, params=null)=>{
    // Re-factored code for API call using fetch    
    let res= apiCall.get(url, {params}).then(res=>res).catch(err=>console.log("errorMessage>>>>",err.message));  
    return res;
}

// SAVE / UPDATE RECORD
export const saveData=(url, data, params=null)=>{
    
    let res;
    if(data.id && data.id!==null){
        res= apiCall.put(url+'/'+data.id, data).then(res=>res).catch(err=>console.log(err.message));  // Re-factored code for API call using fetch    
    }
    else{
        res= apiCall.post(url, data).then(res=>res).catch(err=>console.log(err.message));  // Re-factored code for API call using fetch    
    }
    return res;
}

// DELETE RECORD
export const deleteData=async (url, id=null, params=null)=>{
    // Re-factored code for API call using fetch    
    console.log("params>>>>",params);
    let res= apiCall.delete(url, {params}).then(res=>res).catch(err=>console.log("errorMessage>>>>",err.message));  
    return res;
}






































//************ For Reference  */
// export const getData=async (url, method="GET", data=null, params=null)=>{
//     // let res=(await axios.get(url));  // Re-factored Using Axios now   
//     let res=(await fetch(url, {method:[method], params:[params]})).json();  // Re-factored code for API call using fetch
//     return res;
//     // let res;
//     // Usual Fetch API Call but here we can use some condition in data filtering.
//     // await fetch(url, {method:[method], params:[params]}) 
//     // .then(res=>res.json())
//     // .then(data=> res=data);
//     // return res;
// }