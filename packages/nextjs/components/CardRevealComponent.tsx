import React from 'react'
import TradingCardView from './TradingCardView'

const CardRevealComponent = ({arrayOfIds} : any) => {

    

  return (
    <div>
        <h2 className='text-center font-bold text-2xl my-8'>Congratulations 🎉🎉🎉</h2>
    <div className='flex justify-center items-center h-full'>
   
    {
      arrayOfIds.map((id: any, index: any) => (
        <div className='mx-2'>
        <TradingCardView id={parseInt(id)} index={index} />
        </div>
      ))
    }
  </div>
  </div>
  
  )
}

export default CardRevealComponent