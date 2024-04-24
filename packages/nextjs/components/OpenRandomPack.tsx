"use client";

import Image from 'next/image'
import React from 'react'
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth';

const OpenRandomPack = () => {

    const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("MarketClash");

  return (
    <div>
        <div className='grid grid-cols-1 justify-center justify-items-center items-center mt-12'>
        <Image src={'/mystery.png'} width={"200"} height={"200"} alt="open pack" className='shadow-2xl rounded-lg animate-pulse-slow' />
        <button className='btn btn-primary mt-8 text-xl btn-md'
         onClick={async () => {
            try {
              await writeYourContractAsync({
                functionName: "openPack",
                args: [2, 1, 2],
              });
            } catch (e) {
              console.error("Error setting greeting:", e);
            }
          }}
        >Open Pack</button>
        </div>
    </div>
  )
}

export default OpenRandomPack