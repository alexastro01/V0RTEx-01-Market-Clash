import Image from 'next/image'
import React from 'react'

const BuiltWithComponent = () => {
  return (
    <div>
        <h2 className='text-center text-sm pt-12 pb-4'>Built with</h2>
        <div className='grid grid-cols-3 items-center justify-items-center'>
            <Image src={'/scroll.jpeg'} width={"84"} height={"84"} alt="scroll logo" className='rounded-full' />
            <Image src={'/Covalent.png'} width={"84"} height={"84"} alt="Covalent logo" />
            <Image src={'/Chainlink.png'} width={"84"} height={"84"} alt="Chainlink logo" />
        </div>
    </div>
  )
}

export default BuiltWithComponent