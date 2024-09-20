'use client'
import React from 'react';

interface LabelProps {
    label: string;
    value?: string;
    for: string;
}

const Label = ({ label, for: htmlFor }: LabelProps) => {
    return (
        <label htmlFor={htmlFor}>
            {label}:
        </label>
    );
}

export default Label;