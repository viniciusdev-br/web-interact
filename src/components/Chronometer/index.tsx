import { useState, useEffect } from 'react';
import './styles.css';

export function Chronometer() {
    const [tempo, setTempo] = useState(0);

    const formatarTempo = (segundos: number) => {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;

        const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
        const segundosFormatados = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;

        return `${minutosFormatados}:${segundosFormatados}`;
    };

    const iniciarCronometro = () => {
        const intervalId = setInterval(() => {
            setTempo((tempoAtual) => tempoAtual + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    };

    useEffect(iniciarCronometro, []);

    return (
        <span className="time-service">{formatarTempo(tempo)}</span>
    )
}