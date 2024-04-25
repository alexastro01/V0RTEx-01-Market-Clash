import React from 'react'
import TradingCardView from './TradingCardView'
import TradingCardInMatch from './TradingCardInMatch'

const ChallengedPlayerBoard = ({ tokenIds, setSelectedAttacker, matchId, selectedAttacker }: any) => {

  return(
    <div className='flex justify-center items-center h-full space-x-48 m-12'>
    {
      tokenIds.map((tokenId: any, index: any) => (
        <TradingCardInMatch matchId={matchId} tokenId={parseInt(tokenId.toString())} index={index} setSelectedAttacker={setSelectedAttacker} selectedAttacker={selectedAttacker} />
      ))
    }

  </div>
  )

}

export default ChallengedPlayerBoard