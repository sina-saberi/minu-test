import React from 'react'
import { layout } from '../models/page'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { addProductToBascet, removeProductFromBascet } from '../manager/productSlice';

const MainLayout: React.FC<layout> = ({ children }) => {
    const { data } = useAppSelector(x => x.products);
    const ref = React.useRef<HTMLButtonElement>(null)
    const dispatch = useAppDispatch();
    const [open, setOpenBascet] = React.useState(false);
    const onBlure = (event: React.FocusEvent<HTMLButtonElement>) => {
        if (!event.relatedTarget?.closest("#bascet"))
            setOpenBascet(false);
        else
            ref.current?.focus();
    }
    return (
        <div>
            <div className='w-full bg-white shadow-md py-2 px-6 flex items-center relative'>
                <button ref={ref} onBlur={onBlure} onFocus={() => setOpenBascet(true)} className=' rounded-full h-10 w-10 flex justify-center items-center hover:bg-gray-200 transition-all'>
                    <i className='icon-shopping-cart text-md'></i>
                </button>
                {(open && data) &&
                    <div id='bascet' className='w-64 max-h-[300px] py-2 bg-white absolute flex flex-col top-full items-center translate-y-1 z-10 rounded-md shadow-md'>
                        <div className='overflow-auto h-full w-full my-5'>
                            {data.products.filter(x => x.count !== undefined && x.count > 0).map(({ id, count, name, image, price, discountPercent }) => (
                                <div key={id} className='flex flex-row-reverse overflow-hidden shadow-md items-center px-2 py-2'>
                                    <div className='w-14 shrink-0 h-full overflow-hidden'>
                                        <img alt='1eds' className='w-full h-full' src={image} />
                                    </div>
                                    <div className='text-sm text-end'>
                                        <h3 className='font-bold '>{name}</h3>
                                        <div className='text-xs'>{((discountPercent ? (price * (discountPercent / 100)) : price) * count).toLocaleString()}</div>
                                    </div>
                                    <div className='text-lg flex items-center w-full'>
                                        <button className='flex items-center' onClick={() => dispatch(addProductToBascet(id))}>
                                            <i className='icon-add'></i>
                                        </button>
                                        <span className='text-xs font-bold'>{count || 0}</span>
                                        <button className='flex items-center' onClick={() => dispatch(removeProductFromBascet(id))}>
                                            <i className='icon-minus'></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className='bg-red-500 w-fit px-2 text-sm py-1 rounded-lg text-white'>پرداخت</button>
                    </div>
                }
            </div>
            <div className='p-6'>
                {children}
            </div>
        </div>
    )
}

export default MainLayout