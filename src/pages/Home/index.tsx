import { useEffect, useState } from 'react';
import { Navbar } from "../../components/Navbar";
import './styles.css';

import { Call } from '../../types/call';
import { socket } from '../../services/socket/socket';
import { SocketEvents } from '../../services/socket/events';

export function Home() {
    const [services, setServices] = useState<Array<Call>>([]);
    const [selectedService, setSelectedService] = useState<Call | null>(null);

    useEffect(() => {
        socket.on(SocketEvents.NEW_CALL, (callReceived: Call) => {
            console.log(callReceived);
            if (services.find(service => service.callId === callReceived.callId)) {
                console.log(`Chamada ${callReceived.callId} já existe na lista de chamadas`);
                return;
            }
            socket.emit(SocketEvents.NEW_CALL_ANSWERED, { callId: callReceived.callId });
            setServices(prevServices => [...prevServices, callReceived]);
        });

        socket.on(SocketEvents.CALL_ENDED, (response: {callId: string}) => {
            console.log(response);
            setServices(prevServices => prevServices.filter(service => service.callId !== response.callId));
            setSelectedService(null);
        });

        socket.on(SocketEvents.END_CALL_ERROR, (response: any) => {
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

    const renderDetailsService = function () {
        if (selectedService) {
            return (
                <>
                    <h2>Chamada selecionada:</h2>
                    <div className="details-service">
                        <span>CallId: {selectedService?.callId}</span>
                        <span>Mídia: {selectedService?.media}</span>
                        <span>Data inicial: {String(selectedService?.startDate)}</span>
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

    return (
        <>
            <Navbar />
            <div className="background-home">
                <div className="container-home">
                    <div className="card-services">
                        <h2>Atendimentos:</h2>
                        <ul className="list-services">
                            {services.map(service => (
                                <li onClick={() => handleSelectService(service)} className="service-item" key={service.callId}>
                                    {renderLineFocus(service.callId)}
                                    <img className="type-midia" src="public/chat_midia.svg" alt="" />
                                    <div className="preview-info">
                                        <h3 className="username-info">{service.caller}</h3>
                                        <p className="service-preview">{service.service}</p>
                                    </div>
                                    <span className="time-service">{'13:48' || String(service.startDate)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="card-services">
                        {renderDetailsService()}
                    </div>
                </div>
            </div>
        </>
    );
}