import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ErrorPage } from './ErrorPage';

export const HomePage = () => {

const [data, setData] = useState(null);
const [nameData, setNameData] = useState('pablo');
const [showError, setShowError] = useState(false);

const getData = () => {

axios.get(`https://api.agify.io?name=${nameData.split(' ').join('%20')}`)
.then(res => setData(res.data))
.catch(error => setShowError(error))

if(nameData.split('').length === 0) {
setNameData('Pablo');
}
}

useEffect(()=> {
getData();
}, [nameData])

return (
<>
    {showError
    ? <ErrorPage/> :
    <div className='grid grid-cols-1 sm:grid-cols-2 place-items-center sm:place-items-end gap-16'>
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
                <p className='text-8xl font-black text-blue-200'>
                    {data.age == null
                    ? <div
                        className='text-sm font-semibold text-center flex flex-col items-center justify-center gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor"
                            class="bi bi-arrow-clockwise fill-blue-500/60" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path
                                d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                        </svg> No se encontró tu edad. Intenta con otro nombre.</div>
                    : data.age}
                </p>
            </div>
            <div className='p-2'>
                <p className='capitalize text-3xl font-semibold'>{data.name}</p>
            </div>
        </div>
        }
    </div>
    }
</>
)
}