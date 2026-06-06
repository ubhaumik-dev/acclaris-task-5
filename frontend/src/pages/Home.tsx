import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import StatsCard from '../components/cards/StatsCard'
import React from 'react'


const Home = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <main className='flex-1'>
        <Header/>

        <div className="grid grid-cols-4 gap-6">
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsCard />
        </div>
      </main>
    </div>
  )
}

export default Home