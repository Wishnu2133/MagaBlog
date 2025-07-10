import React ,{useState} from 'react';
import {Link , useNavigate} from 'react-router-dom'
import authservice from  '../../appwrite/auth'
import {InputFild , Button , Logo} from '../index'
import { useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form'
import {login as authLogin} from '../../Store/authSlice'


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const{register , handleSubmit} = useForm()
    const [error ,setError] = useState("")

    const login = async (data)=>{
        setError("")
        try {
            const session = await authservice.login(data)
            if (session) {
                const userdata = await authservice.getCurrentUser()
                if (userdata) {
                    dispatch(authLogin(userdata))
                    navigate("/")
                }
            } else {
                
            }
        } catch (error) {
            setError(error.massage)
        }
    }

    return(
        <div>
            <div>
                <he>SignIn in your Account</he>
                <p>Dont have account? <Link to={'/signup'}>SignUp</Link></p>
                {/* handleSubmit is predefin method by react-hook-form/useForm , we give our mathod to  */}
                <form onSubmit={handleSubmit(login)}>
                     <div>
                        <InputFild label="email" placeHolder = "Enter your email" type="email" 
                            {...register("email" , {required:true})}
                        />
                        <InputFild label="password" type="password" placeHolder="Enter password" 
                            {...register("password" , {required:true})}/>
                     <Button type='submit' className='hover::bg-bule-400'>SignIn</Button>
                     </div>
                </form>
            </div>
        </div>
    )
}

export  default Login;