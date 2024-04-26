

import React, { useEffect, useState } from 'react'
import { useScaffoldReadContract } from '~~/hooks/scaffold-eth';
import ChallengedPlayerBoard from './ChallengedPlayerBoard';
import ChallengerPlayerBoard from './ChallengerPlayerBoard';
import { useAccount } from 'wagmi';
import AttackComponent from './AttackComponent';


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

  const { data: turnOfPlayer } = useScaffoldReadContract({
    contractName: "MarketClash",
    functionName: "turnOfPlayer",
    args: [matchId],
  });

  useEffect(() => {
    console.log('Selected attacker : ', selectedAttacker)
    console.log("Selected attacked : ", selectedAttacked)
  }, [selectedAttacker])

  useEffect(() => {
    console.log(
      "Challanger player cards : ", challengerTokenIds,
      "Challanged player cards : ", challengedTokenIds
    )
  }, [challengedTokenIds, challengerTokenIds]);


  

  function handleSelectWrongCard() {
      console.log("wrong Card selected")
  }
  
  

  return (
    <div>
      {challengedTokenIds ? 

      <ChallengedPlayerBoard 
      challenged={challenged}
      tokenIds={challengedTokenIds}
       matchId={matchId} 
       setSelectedAttacker={address === challenged ? setSelectedAttacker : handleSelectWrongCard} 
       selectedAttacker={selectedAttacker} 
       setSelectedAttacked={address === challenged ? handleSelectWrongCard : setSelectedAttacked}
       selectedAttacked={selectedAttacked}
       addressOfUser={address}
       />
       : <div>loading...</div>}


     { 
  turnOfPlayer === address && selectedAttacked > -1 && selectedAttacker > -1 && 
       <AttackComponent selectedAttacker={selectedAttacker} selectedAttacked={selectedAttacked} challenger={challenger} challenged={challenged} /> 
       
      }

{ 
  turnOfPlayer !== address && selectedAttacked > -1 && selectedAttacker > -1 && 
  <div className='flex justify-center items-center h-full my-0'>
  <button className='btn' disabled={true}>Opponent's turn</button>
</div>
       
      }



   
      {challengerTokenIds ?
       <ChallengerPlayerBoard 
       challenger={challenger}
       tokenIds={challengerTokenIds} 
       matchId={matchId}
       setSelectedAttacker={address === challenger ? setSelectedAttacker : handleSelectWrongCard} 
       selectedAttacker={selectedAttacker}
       setSelectedAttacked={address === challenger ? handleSelectWrongCard : setSelectedAttacked}
       selectedAttacked={selectedAttacked}
       addressOfUser={address}
       /> 
       
       : <div>loading...</div>}

    </div>
  )
}

export default MatchComponent