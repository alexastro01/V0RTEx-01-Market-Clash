"use client";

import React, { useEffect } from 'react'
import { Address } from './scaffold-eth'
import { useScaffoldReadContract } from '~~/hooks/scaffold-eth';
import { useAccount } from 'wagmi';

const PlayersComponent = () => {

    const {address: addressOfUser} = useAccount();

    const { data: players } = useScaffoldReadContract({
        contractName: "MarketClash",
        functionName: "getPlayersWithDeck"
      });

      useEffect(() => {
         console.log(players)
      }, [players])


  return (
  <div className="mt-8">
{players ? (
  players.map((address, index) => (
    <div className='flex justify-center'>
    <div className='m-4 flex justify-center'>
    <Address key={index} address={address} size="xl"  />
    <button className={addressOfUser === address ? "btn btn-accent btn-sm ml-2 min-w-36" : "btn btn-primary btn-sm ml-2 min-w-36"}>{addressOfUser === address ? "You" : "Challenge"}</button>
    </div>
 
    </div>
  ))
) : (
  <div>loading...</div>
)}

  </div>
  )
}

export default PlayersComponent