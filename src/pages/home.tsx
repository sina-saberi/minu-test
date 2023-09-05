import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MainLayout from '../layouts/mainLayout';
import { page } from '../models/page';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { addProductToBascet, getProducts, removeProductFromBascet } from '../manager/productSlice';



const Home: page = () => {
    const { data } = useAppSelector(x => x.products);
    const dispatch = useAppDispatch();

    const getData = React.useCallback(async () => {
        dispatch(getProducts());
    }, [dispatch]);

    React.useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div>
            {data &&
                <React.Fragment>
                    <div>
                        <Swiper
                            className='rounded-md'
                            autoplay
                            loop={true}
                        >
                            {data.sliders.map((slider) => (
                                <SwiperSlide key={slider.id}>
                                    <div>
                                        <img alt={slider.id.toString()} className='w-full h-full' src={slider.image} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className='mt-3 py-3 px-3 rounded-md bg-gray-100 grid gap-2 w-full xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2'>
                        {data.products.map(({ id, name, price, discountPercent, count, image }) => (
                            <div key={id.toString()} className='col-span-1'>
                                <div className='bg-white flex w-full flex-col rounded-md overflow-hidden py-3 ' >
                                    <div className='w-full'>
                                        <img className='w-full h-full' src={image} alt={name} />
                                    </div>
                                    <div className='px-3 mt-3'>
                                        <div className='font-bold flex justify-between items-center flex-row-reverse'>
                                            {(discountPercent ? (price * (discountPercent / 100)) : price).toLocaleString()}
                                            {discountPercent &&
                                                <div className='bg-red-500 text-xs flex justify-center items-center text-white font-normal rounded-full py-0.5 px-2'>{discountPercent}%</div>
                                            }
                                        </div>
                                        <div className='flex flex-row-reverse text-xs justify-between mt-2'>
                                            <div className='line-through text-gray-600'>
                                                {discountPercent && price.toLocaleString()}
                                            </div>
                                            <div className='text-lg flex items-center'>
                                                <button className='flex items-center' onClick={() => dispatch(addProductToBascet(id))}>
                                                    <i className='icon-add'></i>
                                                </button>
                                                <span className='text-xs font-bold'>{count || 0}</span>
                                                <button className='flex items-center' onClick={() => dispatch(removeProductFromBascet(id))}>
                                                    <i className='icon-minus'></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            }
        </div>
    )
}
Home.url = "/";
Home.getLayout = (page) => <MainLayout>{page}</MainLayout>
export default Home