import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

import { socket } from '../../services/socket/socket';
import { SocketEvents } from '../../services/socket/events';
import useUserData from '../../context/User';

export function Navbar() {
    const {user, setUserDataContext} = useUserData();
    const navigate = useNavigate();

    const handleLogout = function () {
        const payload = {
            username: user?.username,
        }
        socket.emit(SocketEvents.USER_DISCONNECT, payload);
    }

    useEffect(() => {
        socket.on(SocketEvents.USER_DISCONNECTED, (response: any) => {
            console.log(response);
            setUserDataContext(null);
            navigate('/login');
        });
        socket.on(SocketEvents.USER_CONNECTION_ERROR, (response: any) => {
            console.log(response);
            alert('Não foi possível conectar: ' + response.error);
        });
        return () => {
            socket.off(SocketEvents.USER_DISCONNECTED);
            socket.off(SocketEvents.USER_CONNECTION_ERROR);
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="container-navbar">
                <h1 className='nav-user-name'>{user?.username}</h1>
                <button className="nav-logout" onClick={handleLogout}>Desconectar</button>
            </div>
        </nav>
    );
}