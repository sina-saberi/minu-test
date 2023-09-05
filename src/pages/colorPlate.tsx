import React from 'react'
import { color } from '../models/color';
import ColorItem from '../components/modules/ColorItem';
import { page } from '../models/page';

const ColorPlate: page = () => {
    const [data, setData] = React.useState<color[]>();

    const getData = React.useCallback(async () => {
        const response = await fetch("/colors.json");
        const json = await response.json();
        setData(json);
    }, [setData])


    React.useEffect(() => {
        getData();
    }, [getData])

    return (
        <div className='fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
            <ul className='grid grid-cols-3 gap-5'>
                {data?.map((color) => (
                    <li className='col-span-1' key={color.number}>
                        <ColorItem {...color} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
ColorPlate.url = "/colors";
ColorPlate.getLayout = () => <div>test parrent</div>;
export default ColorPlate