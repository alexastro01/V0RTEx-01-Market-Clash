

import React, { useEffect, useState } from 'react'
import { useScaffoldReadContract } from '~~/hooks/scaffold-eth';
import ChallengedPlayerBoard from './ChallengedPlayerBoard';
import ChallengerPlayerBoard from './ChallengerPlayerBoard';
import { useAccount } from 'wagmi';


const MatchComponent = ({ challenger, challenged, matchId }: any) => {

  const [selectedAttacker, setSelectedAttacker] = useState(0);
  const [selectedAttacked, setSelectedAttacked] = useState(0);
  const { address } = useAccount();

  const { data: challengerTokenIds } = useScaffoldReadContract({
    contractName: "MarketClash",
    functionName: "getDeckUsedInMatchByPlayer",
    args: [matchId, challenger],
  });

  const { data: challengedTokenIds } = useScaffoldReadContract({
    contractName: "MarketClash",
    functionName: "getDeckUsedInMatchByPlayer",
    args: [matchId, challenged],
  });

  useEffect(() => {
    console.log('Selected attacker : ', selectedAttacker)
  }, [selectedAttacker])

  useEffect(() => {
    console.log(
      "Challanger player cards : ", challengerTokenIds,
      "Challanged player cards : ", challengedTokenIds
    )
  }, [challengedTokenIds, challengerTokenIds])



  return (
    <div>
      {challengedTokenIds ? 

      <ChallengedPlayerBoard 
      tokenIds={challengedTokenIds}
       matchId={matchId} 
       setSelectedAttacker={address === challenged ? setSelectedAttacker : null} 
       selectedAttacker={selectedAttacker} 
       setSelectedAttacked={address === challenged ? null : setSelectedAttacked}
       selectedAttacked={selectedAttacked}
       />
       : <div>loading...</div>}

      {challengerTokenIds ?
       <ChallengerPlayerBoard 
       tokenIds={challengerTokenIds} 
       matchId={matchId}
       setSelectedAttacker={address === challenger ? setSelectedAttacker : null} 
       selectedAttacker={selectedAttacker}
       setSelectedAttacked={address === challenger ? null : setSelectedAttacked}
       selectedAttacked={selectedAttacked}
       /> 
       
       : <div>loading...</div>}

    </div>
  )
}

export default MatchComponent