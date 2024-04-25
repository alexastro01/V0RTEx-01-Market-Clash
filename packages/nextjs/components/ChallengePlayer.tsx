import React from 'react'
import { useAccount } from 'wagmi'
import { Address } from './scaffold-eth';

const ChallengePlayer = ({address} : any) => {

    const {address: addressOfUser} = useAccount();

    return (
        <div className='m-4 flex justify-center'>
            <Address  address={address} size="xl" />
            <button className={addressOfUser === address ? "btn btn-accent btn-sm ml-2 min-w-36" : "btn btn-primary btn-sm ml-2 min-w-36"}>{addressOfUser === address ? "You" : "Challenge"}</button>
        </div>

    )
}

export default ChallengePlayer