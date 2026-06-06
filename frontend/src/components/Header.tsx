import React from 'react'
import { Calendar, Download } from "lucide-react";

const Header = () => {
  return (
    <div className='bg-black w-full h-fit'>
       

      {/* Left Section */}

      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        
          <p className="text-white mt-2">
            Overview of your expenses and spending insights
          </p>
        
      </div>
      
    </div>
  )
}

export default Header