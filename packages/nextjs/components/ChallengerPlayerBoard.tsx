import React from 'react'
import TradingCardInMatch from './TradingCardInMatch'

const ChallengerPlayerBoard = ({tokenIds, matchId, setSelectedAttacker, selectedAttacker} : any) => {
  return (
    <div className='flex justify-center items-center h-full space-x-48 m-12'>
       {
        tokenIds.map((tokenId: any, index: any) => (
          <TradingCardInMatch matchId={matchId} tokenId={parseInt(tokenId.toString())} index={index} setSelectedAttacker={setSelectedAttacker} selectedAttacker={selectedAttacker} />
        ))
       }

    </div>
  )
}

export default ChallengerPlayerBoard