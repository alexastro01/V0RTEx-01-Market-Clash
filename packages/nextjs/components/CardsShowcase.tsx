import React from 'react'
import { ThreeDCardDemo } from './CardDemo'
import { TypewriterEffectSmooth } from './ui/typewritter-effect';

const CardsShowcase = () => {
    const words = [
        {
          text: "3",
        },
        {
          text: "Types",
        },
        {
          text: "of",
        },
        {
            text: "Cards",
          },
       
      ];

  return (
    <>
    <div className='text-center flex justify-center'>
     <TypewriterEffectSmooth words={words} className='text-white' />
     </div>
    <div className='grid grid-cols-3'>
  
        <ThreeDCardDemo titleText={"Bitcoin Card"} cardImage={'/bitcoinCard.png'} />
        <ThreeDCardDemo titleText={"Ethereum Card"} cardImage={'/ethereumCard.png'} />
        <ThreeDCardDemo titleText={"ChainLink Card"} cardImage={'/linkCard.png'} />
    </div>
    </>
  )
}

export default CardsShowcase