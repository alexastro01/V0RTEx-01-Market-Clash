"use client";

import Image from 'next/image'
import React from 'react'
import { useScaffoldWriteContract, useScaffoldWatchContractEvent } from '~~/hooks/scaffold-eth';

const OpenRandomPack = () => {

    const { writeContractAsync: writeYourContractAsync, data } = useScaffoldWriteContract("MarketClash");

  const handleOpenPack = async () => {
    try {
      await writeYourContractAsync(
        {
          functionName: "openPack",
          args: [0,1,2],
    
        },
        {
         //Get mapping of most recent pack on block confirmation
         //change state, display cards
          onBlockConfirmation: txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt);
          },
        },
      );
    } catch (e) {
      console.error("Error setting greeting", e);
    }
  };

  useScaffoldWatchContractEvent({
    contractName: "MarketClash",
    eventName: "openedPackByPlayer",
    // The onLogs function is called whenever a GreetingChange event is emitted by the contract.
    // Parameters emitted by the event can be destructed using the below example
    // for this example: event GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
    onLogs: logs => {
      logs.map(log => {
        console.log("📦 Event logs", log.args);
      });
    },
  });

  return (
    <div>
        <div className='grid grid-cols-1 justify-center justify-items-center items-center mt-12'>
        <Image src={'/mystery.png'} width={"200"} height={"200"} alt="open pack" className='shadow-2xl rounded-lg animate-pulse-slow' />
        <button className='btn btn-primary mt-8 text-xl btn-md'
         onClick={() => handleOpenPack()}>Open Pack</button>
        </div>
    </div>
  )
}

export default OpenRandomPack