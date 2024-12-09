import React from 'react'
import { HiOutlineStar,HiStar } from "react-icons/hi2";

const CurrencyDropDown = (
  {
    currency,
    setCurrency,
    currencies=[],
    favourite=[], 
    handleFavourite,
    title="",
  }) => {
  const isFavourite= (current)=>favourite.includes(current)

  return (
    <div className='mt-1 relative'>
      <label className='block text-sm font-medium' htmlFor="{title}">{title}</label>
      <div>
        <select 
        className='w-full p-2 border border-gray-200 rounded-md shadow-sm focus:outline-none foucs:ring-2 focus:ring-indigo-500'    
        value={currency}  
        onChange={(e)=>setCurrency(e.target.value)}
        >{favourite.map((favCurrency)=>        
           (<option value={favCurrency} key={favCurrency}>
            {favCurrency}
            </option>)
        )}
          {currencies
          .filter((c)=>!favourite.includes(c))
          .map((currency) =>(<option value={currency} key={currency} className='bg-gray-200'>
              {currency}
              </option>
          ))}
        </select> 
        <button className='absolute bottom-2 right-3 p-1.5 flex items-center text-sm leading-5'
        onClick={()=>handleFavourite(currency)}>
          {isFavourite(currency)? <HiStar /> : <HiOutlineStar /> }
        </button>
      </div>
    </div>
  )
}

export default CurrencyDropDown;
