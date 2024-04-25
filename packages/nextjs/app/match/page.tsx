'use client';

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import MatchComponent from '~~/components/MatchComponent';
const Match = () => {

    const searchParams = useSearchParams()
 
    const challenger = searchParams.get('challenger')
    const challenged = searchParams.get('challenged')

    useEffect(() => {
    console.log(challenger, challenged)
    }, [challenger, challenged])

  return (
    <div>
        <MatchComponent challenger={challenger} challenged={challenged} />
    </div>
  )
}

export default Match