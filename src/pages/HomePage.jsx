import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const HomePage = () => {

const [data, setData] = useState(null);
const [nameData, setNameData] = useState('pablo');

const getData = () => {

    axios.get(`https://api.agify.io?name=${nameData}&country_id=MX`)
    .then(res => setData(res.data))
    .catch(error => console.log(error))

    if(nameData.split('').length === 0) {
        setNameData('Pablo');
    }
}

useEffect(()=> {
getData();
}, [nameData])

return (
<div className='grid grid-cols-1 sm:grid-cols-2 place-items-end gap-16'>
    <div className='flex flex-col gap-3'>
        <div>
            <h1 className='text-4xl font-bold'>Namege</h1>
            <p className='mt-2'>Una aplicación simple para predecir la edad de una persona con su nombre</p>
        </div>
        <hr className='border border-blue-500/10' />
        <label className='font-bold' htmlFor="name">Nombre</label>
        <p className='text-sm text-blue-300/50'>Coloca tu nombre y descubre cuál es tu edad según los datos.</p>
        <input id='name' className='border-2 border-blue-900/20 rounded-xl bg-blue-400/5 px-4 py-4'
            onChange={(e)=>setNameData(e.target.value)} type="text" />
        <div className='flex justify-start items-center gap-4 text-sm text-blue-300/50'>
            <a rel='noopener noreferer' target={'_blank'} href='https://www.pasabaa.com/'>&copy; {new
                Date().getFullYear()} Pablo Sánchez</a>
        </div>
    </div>
    {
    data &&
    <div
        className='flex flex-col items-center justify-center border-4 border-blue-900/20 rounded-2xl h-64 w-64 bg-blue-900/10'>
        <div className='p-2'>
            <p className='text-8xl font-black text-blue-200'>{data.age}</p>
        </div>
        <div className='p-2'>
            <p className='capitalize text-3xl font-semibold'>{data.name}</p>
        </div>
    </div>
    }
</div>
)
}