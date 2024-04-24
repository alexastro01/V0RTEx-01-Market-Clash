import Image from 'next/image'
import React from 'react'

const OpenRandomPack = () => {
  return (
    <div>
        <div className='flex justify-center mt-12'>
        <Image src={'/mystery.png'} width={"200"} height={"200"} alt="open pack" className='shadow-2xl rounded-lg' />
        </div>
    </div>
  )
}

export default OpenRandomPack