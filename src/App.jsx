import { useState ,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authservice from './appwrite/auth'
import './App.css'
import { login ,logout } from './Store/authSlice'
import { Footer, Header } from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // when the app load useEffect autometically run 
  useEffect(()=>{
    // we fetch userAccount using created method in authservice if it find we call login function automatically
    authservice.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login(userData))
      } else {
        // userAccount dont get then we call logout function
        dispatch(logout())
      }
    }).finally(() => {setLoading(false)}) // finally always run in any conddition at end 

    
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null

}

export default App
