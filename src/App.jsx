import { useState ,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authservice from './appwrite/auth'
import './App.css'
import { login ,logout } from './Store/authSlice'
import { Footer, Header } from './components/index'

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
      <div className='min-h-screen bg-grey-500 flex flex-wrap'>
        <Header/>
        <main>
          TODO:
        </main>
        <Footer/>
      </div>
    ) : (null) ;

}

export default App
