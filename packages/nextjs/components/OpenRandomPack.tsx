import Image from 'next/image'
import React from 'react'

const OpenRandomPack = () => {
  return (
    <div>
        <div className='grid grid-cols-1 justify-center justify-items-center items-center mt-12'>
        <Image src={'/mystery.png'} width={"200"} height={"200"} alt="open pack" className='shadow-2xl rounded-lg animate-pulse-slow' />
        <button className='btn btn-primary mt-8 text-xl btn-md'>Open Pack</button>
        </div>
    </div>
  )
}

export default OpenRandomPack