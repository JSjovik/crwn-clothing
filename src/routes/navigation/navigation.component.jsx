import {Outlet, Link} from 'react-router-dom'
import {Fragment, useContext} from 'react';
import {ReactComponent as Crwnlogo} from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../contexts/users.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {

    const {currentUser,} = useContext(UserContext);

    

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <Crwnlogo className='logo'/>
                </Link>

                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        Shop
                    </Link>
                    {currentUser ? (
                            <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                            ):(<Link className='nav-link' to='/auth'>
                            Sign In
                        </Link>)
                         }
                    
                </div>
            </div>
            <Outlet/>
        </Fragment>

    );
};

export default Navigation;