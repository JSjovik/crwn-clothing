import {Outlet, Link} from 'react-router-dom'
import {Fragment} from 'react';
import {ReactComponent as Crwnlogo} from '../../assets/crown.svg';

const Navigation = () => {
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <Crwnlogo className='logo'/>
                </Link>

                <div className='links-container'>
                    <Link className='nav-link' to='/shop'>
                        Shop
                    </Link>
                </div>
            </div>
            <Outlet/>
        </Fragment>

    );
};

export default Navigation;