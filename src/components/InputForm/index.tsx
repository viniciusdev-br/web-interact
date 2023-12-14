import React from 'react';
import './styles.css';

export function InputForm({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input className='input-form' {...props} />
    );
}