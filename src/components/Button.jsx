// Comman Button so we can Use anyWhere we want

import React from 'react';

function Button(
    {
       children,// children is nothing but text that we want to show on button 
       type = 'button',
       bgColor = 'bg-blue-500',
       textColor = 'white',
       className = '',
       ...props 
    }) {
        return (
            <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}{...props}>
            {children}
            </button>
        )
    
}

export default Button;