import React , {useEffect , useState} from 'react';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children , authentication=true}){
    const navigate = useNavigate()
    const [loader , setLoader] = useState(true)
    const userSatus = useSelector((state)=>state.auth.status)

    useEffect(()=>{
        // if user is authenticat but userStatus is false then user render at login page 
        if (authentication && userSatus !== authentication) {
            navigate('/login')
        } else if(!authentication && userSatus !== authentication) { //but if user is authenticate and userStatus is true then you can go on home page
            navigate('/')
        }
        setLoader(false)
    },[userSatus , navigate , authentication])

    return loader ? <h1>Loding....</h1> : <> {children} </> 
}
