import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import './styles.css';

import { socket } from '../../services/socket/socket';
import { SocketEvents } from '../../services/socket/events';
import useUserData from '../../context/User';
import { ResponseUserName } from '../../types/call';

export function Navbar() {
    const {user, setUserDataContext} = useUserData();
    const navigate = useNavigate();

    const handleLogout = function () {
        setUserDataContext(null);
        navigate('/login');
        // const payload = {
        //     username: user?.username,
        // }
        // socket.emit(SocketEvents.USER_DISCONNECT, payload);
    }

    const cbUserDisconnected = function (response: ResponseUserName) {
        console.log('Usuário desconectado: ' + response.username);
        setUserDataContext(null);
        navigate('/login');
    }

    useEffect(() => {
        socket.on(SocketEvents.USER_DISCONNECTED, cbUserDisconnected);
        return () => {
            socket.off(SocketEvents.USER_DISCONNECTED);
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="container-navbar">
                <h1 className='nav-user-name'>{user?.username}</h1>
                <button className="nav-logout" onClick={handleLogout}>
                    Sair
                    <MdLogout size={20} color="#FFF" />
                </button>
            </div>
        </nav>
    );
}