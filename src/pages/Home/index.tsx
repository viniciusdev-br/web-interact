import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdChat } from 'react-icons/md';
import { Navbar } from "../../components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

import { Call, ResponseEndCallError } from '../../types/call';
import { socket } from '../../services/socket/socket';
import { SocketEvents } from '../../services/socket/events';
import { Chronometer } from '../../components/Chronometer';
import useUserData from '../../context/User';
import { ToastContainer, toast } from 'react-toastify';

export function Home() {
    const [services, setServices] = useState<Array<Call>>([]);
    const [selectedService, setSelectedService] = useState<Call | null>(null);
    const navigate = useNavigate();
    const { user } = useUserData();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        socket.on(SocketEvents.NEW_CALL, (callReceived: Call) => {
            console.log(callReceived);
            toast(`Nova chamada recebida de ${callReceived.caller}.`);
            if (services.find(service => service.callId === callReceived.callId)) {
                console.log(`Chamada ${callReceived.callId} já existe na lista de chamadas`);
                return;
            }
            socket.emit(SocketEvents.NEW_CALL_ANSWERED, { callId: callReceived.callId });

            setServices(prevServices => [...prevServices, callReceived]);
        });

        socket.on(SocketEvents.CALL_ENDED, (response: { callId: string }) => {
            console.log(response);
            setServices(prevServices => prevServices.filter(service => service.callId !== response.callId));
            setSelectedService(null);
        });

        socket.on(SocketEvents.END_CALL_ERROR, (response: ResponseEndCallError) => {
            console.log(response);
            alert('Não foi possível finalizar a chamada: ' + response.error);
        });

        return () => {
            socket.off(SocketEvents.NEW_CALL);
            socket.off(SocketEvents.CALL_ENDED);
            socket.off(SocketEvents.END_CALL_ERROR);
        }
    }, []);

    const handleSelectService = function (callChoosed: Call | null) {
        setSelectedService(callChoosed);
    }

    const handleFinishCall = function (callId: string) {
        socket.emit(SocketEvents.END_CALL, { callId: callId });
    }

    const formatDate = function (dateStr: string) {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');

        const formatedDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
        return formatedDate;
    }

    const renderDetailsService = function () {
        if (selectedService) {
            return (
                <>
                    <h2>Chamada selecionada:</h2>
                    <div className="details-service">
                        <span>ID da chamada: {selectedService?.callId}</span>
                        <span>Mídia: {selectedService?.media}</span>
                        <span>Data inicial: {formatDate(selectedService?.startDate)}</span>
                        <span>Serviço: {selectedService?.service}</span>
                        <span>Origem: {selectedService?.caller}</span>
                    </div>
                    <button onClick={() => handleFinishCall(selectedService.callId)} className="btn-finish-call">Finalizar</button>
                </>
            )
        }
        return (<h2>Selecione uma chamada</h2>)
    }

    const renderLineFocus = function (callId: string) {
        if (selectedService && selectedService.callId === callId) {
            return <div className="line-focus" />
        }
        return null;
    }

    const selectedItem = function (callId: string) {
        if (selectedService && selectedService.callId === callId) {
            return 'selected-item';
        }
        return '';
    }

    return (
        <>
            <Navbar />
            <div className="background-home">
                <div className="container-home">
                    <div className="card-services">
                        <h2>Atendimentos:</h2>
                        <ul className="list-services">
                            {services.map(service => (
                                <li onClick={() => handleSelectService(service)} className={`service-item ${selectedItem(service.callId)}`} key={service.callId}>
                                    {renderLineFocus(service.callId)}
                                    <MdChat size={30} color="#F08E2A" />
                                    <div className="preview-info">
                                        <h3 className="username-info">{service.caller}</h3>
                                        <p className="service-preview">{service.service}</p>
                                    </div>
                                    <Chronometer />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="card-services">
                        {renderDetailsService()}
                    </div>
                </div>
                <ToastContainer 
                    position='bottom-right'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    theme='dark'
                />  
            </div>
        </>
    );
}