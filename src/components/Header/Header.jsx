
import {Container, Logo , LogoutBtn} from '../index' ;
import { useSelector} from 'react-redux';
import {Link , useNavigate } from 'react-router-dom'




function Header() {
    const authStatus = useSelector(state=>state.auth.status) // Checking status value of user
    const nevigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            url: '/',
            active : true
        },
        {
            name:'Login',
            url: '/login',
            active:!authStatus
        },
        {
            name: 'Signup',
            url : '/signup',
            active: !authStatus,
        },
        {
            name: 'All-Post',
            url : '/all=post',
            active:authStatus,
        },
        {
            name: 'AddPost',
            url : '/addpost',
            active: authStatus
        }

    ]
    return (
        <header className='py-3 shadow bg-gray-500'>
        {/* create one container and navbar/Header */}
            <Container>
            <nav className='flex'>
                <div className='mr-4'>
                {/* we  create logo and wrap in link so we can navigate at some point */}
                    <Link to='/'>
                        <Logo width='70px'/>
                    </Link>
                </div>
                {/* here we use map loop on navItem and and display base on active status  
                    If user is active then we show all home and other with logout button */}
                <ul className='flex ml-auto'>
                {/* if User is not active then we show them login and Signup Button  */}
                    {navItems.map((item)=> item.active ? (<li key={item.name}>
                        <button 
                        className= 'inline-box px-6 py-2 duration-200 hover:bg-blur-400 rounded-full'
                        onClick={()=> nevigate(item.url)}>{item.name}
                        </button>
                    </li>) : null )}
                    {authStatus && (
                        <li><LogoutBtn/></li>
                    )}
                </ul>
            </nav>
            </Container>
        </header>
    )
}

export default Header;