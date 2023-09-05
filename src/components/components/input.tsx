import React from 'react'

interface inputProps {
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>
}
const Input: React.FC<inputProps> = ({ label, onChange, value }) => {
    return (
        <label className='flex flex-col min-w-[200px] '>
            {label}
            <div className='border rounded-md overflow-hidden px-3'>
                <input className='outline-none w-full h-full' value={value} onChange={onChange} />
            </div>
        </label>
    )
}

export default Input