import React from 'react'
import { color } from '../models/color';
import ColorItem from '../components/modules/ColorItem';
import { page } from '../models/page';
import Input from '../components/components/input';

const ColorPlate: page = () => {
    const [rowsAndColums, setRowsAndColums] = React.useState({ rows: 3, columns: 4 });
    const [data, setData] = React.useState<color[]>();

    const getData = React.useCallback(async () => {
        const response = await fetch("/colors.json");
        const json = await response.json();
        setData(json);
    }, [setData]);

    React.useEffect(() => {
        getData();
    }, [getData]);

    const getNumbers = () => {
        if (data) {
            let array = data.slice()
            let newArr: color[][] = [];
            for (let i = 0; i < rowsAndColums.columns; i++) {
                newArr.push(array.splice(0, rowsAndColums.rows));
            }
            return newArr
        }
        return [];
    }

    const setNumbers = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (data) {
                let name = event.target.name as keyof typeof rowsAndColums;
                let value = parseInt(event.target.value);
                if (value && value <= data.length) {
                    let other = Math.ceil(data.length / value)
                    setRowsAndColums({
                        columns: name === "rows" ? other : value,
                        rows: name === "columns" ? other : value,
                    })
                }
            }
        }, [data, rowsAndColums])

    return (
        <div className=''>
            {data &&
                <React.Fragment>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-2'>
                            <label className='flex flex-col min-w-[200px] '>
                                {"rows"}
                                <div className='border rounded-md overflow-hidden px-3'>
                                    <input onChange={setNumbers} value={rowsAndColums.rows.toString()} name='rows' className='outline-none w-full h-full' />
                                </div>
                            </label>
                            <label className='flex flex-col min-w-[200px] '>
                                {"columns"}
                                <div className='border rounded-md overflow-hidden px-3'>
                                    <input onChange={setNumbers} value={rowsAndColums.columns.toString()} name='columns' className='outline-none w-full h-full' />
                                </div>
                            </label>
                        </div>
                    </div>
                    <div>
                        {getNumbers().map((x, index) => (
                            <div className='flex' key={index}>
                                {x.map(color => (
                                    <span className='w-fit bg-red-300' key={color.number.toString()}>
                                        <ColorItem {...color} />
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            }
        </div>
    )
}
ColorPlate.url = "/colors";
ColorPlate.getLayout = (page) => <div>{page}</div>;
export default ColorPlate