import React from 'react'
import { BentoGridComponent } from './BentoGrid'
import BuiltWithComponent from './BuiltWithComponent'

const Hero = () => {
  return (
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-2xl">
      <h1 className="text-5xl font-bold">The Crypto Currency Card Game</h1>
      <p className="py-6">Crypto prices affect the stats of your cards, are the markets in your favour?</p>
      <button className="btn btn-primary">Get Started</button>
      <BuiltWithComponent />
    </div>
  </div>
</div>
  )
}

export default Hero


