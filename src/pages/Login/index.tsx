import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import HashLoader from 'react-spinners/HashLoader';

import './styles.css';
import { socket } from '../../services/socket/socket';
import { SocketEvents } from '../../services/socket/events';
import useUserData, { UserData } from '../../context/User';
import { ErrorConnectionUser } from '../../types/call';
import { InputForm } from '../../components/InputForm';

export function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState<string>('');
    const [maxCalls, setMaxCalls] = useState<number>(0);

    const { setUserDataContext, user } = useUserData();
    const { t } = useTranslation();

    const navigate = useNavigate();

    useEffect(() => {
        socket.on(SocketEvents.USER_CONNECTED, (userResponse: UserData) => {
            console.log(userResponse);
            setIsLoading(false);
            setUserDataContext(userResponse);
        });
        socket.on(SocketEvents.USER_CONNECTION_ERROR, (response: ErrorConnectionUser) => {
            console.log(response);
            setIsLoading(false);
            toast('Não foi possível conectar: ' + response.error);
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
        if (username === '' || maxCalls <=0) {
            toast.warning('Preencha todos os campos corretamente.');
            return;
        }
        setIsLoading(true);
        const value = {
            username: username,
            maxCalls: maxCalls,
        }
        socket.timeout(10000).emit(SocketEvents.USER_CONNECT, value);
    }

    const handleUsername = function (event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    const handleMaxCalls = function (event: React.ChangeEvent<HTMLInputElement>) {
        setMaxCalls(Number(event.target.value));
    }

    return (
        <div className="background-login">
            <div className="container-login">
                <img src="https://i.stack.imgur.com/ILTQq.png" alt=""></img>
                <div className='container-form'>
                    <h1 className='title-form'>{t('login.titleForm')}</h1>
                    <div className='container-inputs'>
                        <InputForm type="text" placeholder={t('login.placeholderUserName')} onChange={handleUsername} />
                        <InputForm type="number" min={1} placeholder={t('login.placeholderMaxCalls')} onChange={handleMaxCalls} />
                    </div>
                    <button onClick={handleLogin} className='submit-form'>
                        {!isLoading ? t('login.btnConect') :
                            <HashLoader loading={true} color='#fff' size={20} />}
                    </button>
                </div>
            </div>
            <div className="background-line" />
            <ToastContainer
                position='bottom-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                theme='dark'
            />
        </div>
    );
}