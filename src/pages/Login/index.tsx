import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';

import './styles.css';
import { socket } from '../../services/socket/socket';
import { SocketEvents } from '../../services/socket/events';
import useUserData from '../../context/User';

export function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState<string>('');
    const [maxCalls, setMaxCalls] = useState<number>(0);

    const { setUserDataContext, user } = useUserData();

    const navigate = useNavigate();

    useEffect(() => {
        socket.on(SocketEvents.USER_CONNECTED, (userResponse: any) => {
            console.log(userResponse);
            setIsLoading(false);
            setUserDataContext(userResponse);
        });
        socket.on(SocketEvents.USER_CONNECTION_ERROR, (response: any) => {
            console.log(response);
            setIsLoading(false);
            alert('Não foi possível conectar: ' + response.error);
        });

        return () => {
            socket.off(SocketEvents.USER_CONNECTED);
            socket.off(SocketEvents.USER_DISCONNECTED);
            socket.off(SocketEvents.USER_CONNECTION_ERROR);
        }
    }, []);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user])

    const handleLogin = function () {
        if (username === '' || maxCalls === 0) {
            alert('Preencha todos os campos');
            return;
        }
        setIsLoading(true);
        const value = {
            username: username,
            maxCalls: maxCalls,
        }
        socket.timeout(10000).emit(SocketEvents.USER_CONNECT, value);
    }

    const handleUsername = function (event: any) {
        setUsername(event.target.value);
    }

    const handleMaxCalls = function (event: any) {
        setMaxCalls(Number(event.target.value));
    }

    return (
        <div className="background-login">
            <div className="container-login">
                <img src="https://i.stack.imgur.com/ILTQq.png" alt=""></img>
                <div className='container-form'>
                    <h1 className='title-form'>Entre em sua conta:</h1>
                    <div className='container-inputs'>
                        <input className='input-form' type="text" placeholder="Nome do usuário" onChange={handleUsername} />
                        <input className='input-form' type="number" min={1} placeholder="Limite de chamadas simultâneas" onChange={handleMaxCalls} />
                    </div>
                    <button onClick={handleLogin} className='submit-form'>
                        {!isLoading ? 'Conectar' :
                        <HashLoader loading={true} color='#fff' size={20} />}
                    </button>
                </div>
            </div>
            <div className="background-line" />
        </div>
    );
}