import React from 'react';
import { color } from '../../models/color';

const ColorItem: React.FC<color> = ({ color, name, number }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <button onBlur={() => setOpen(false)} onClick={() => setOpen(true)} style={{ backgroundColor: color }} className='relative text-lg rounded-xl font-bold text-white flex justify-center items-center w-20 h-20'>
            {open && <div className='-translate-y-2 absolute bottom-full rounded-md px-5 py-1 text-black bg-white min-w-[40px] text-sm shadow-lg shadow-gray text-center'>
                {name}
            </div>}
            {number}
        </button>
    )
}

export default ColorItem