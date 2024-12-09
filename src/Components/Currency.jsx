import { useState, useEffect } from "react"
import CurrencyDropDown from "./dropDown";
import { HiArrowsRightLeft } from "react-icons/hi2";


function Currency(){
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(5)
  const[fromCurrencyDropDown, setFromCurrencyDropDown] = useState("USD")
  const[toCurrencyDropDown, settoCurrencyDropDown] = useState("EUR")
  const[convertedAmount,setConvertedAmount]=useState(null)
  const[converting,setConverting]=useState(false)
  const[favourite, setFavourite]= useState([])

  useEffect( ()=> {
    fetchCurrencies()
    const savedFavourites=JSON.parse(localStorage.getItem("favourite"))||[];
    setFavourite(savedFavourites)
  },[]
  ) 

  const fetchCurrencies=async()=>{
    try {
      const res =await fetch("https://api.frankfurter.app/currencies")
      const data= await res.json()
      setCurrencies(Object.keys(data)) //conveting object into array
    } catch (error) {
      console.error("Error Fetching", error)
    }
  }
 

  const convertCurrency=async()=>{
    if(!amount || amount <= 0)return; //Prevent zero or negative amounts
    setConverting(true);
    try {
      const res =await fetch(`https://api.frankfurter.app/latest?base=${fromCurrencyDropDown}&symbols=${toCurrencyDropDown}`)
      const data= await res.json()
     setConvertedAmount(data.rates[toCurrencyDropDown]*amount+" " + toCurrencyDropDown);
    } catch (error) {
      console.error("Error Fetching", error)
    } finally{setConverting(false)}
  }

  const handleFavourite =(currency)=>{
    // function to add favourite by clicking on star
    let updatedFavourite =[...favourite]
    if(favourite.includes(currency)){
      updatedFavourite=updatedFavourite.filter((fav)=>fav!==currency)
    }else{
      updatedFavourite.push(currency)
    }setFavourite(updatedFavourite)
    localStorage.setItem("favourite", JSON.stringify(updatedFavourite))
  }

  const swapCurrencies=(currency)=>{
    setFromCurrencyDropDown(toCurrencyDropDown)
    settoCurrencyDropDown(fromCurrencyDropDown)
  }

  
  
  return( 
<>
  <div className="max-w-xl mx-auto my-10 p-5 bg-blue-100 rounded-lg shadow-md">
  <h3 className="mb-5 text-3xl text-center font-bold text-green-700">Currency Conventor</h3>

  <div className="gri grid-cols-5 sm:grid-cols-3 gap-4 items-end"> 
    <CurrencyDropDown currencies={currencies} title="From:"  handleFavourite={handleFavourite}
    currency={fromCurrencyDropDown}
    setCurrency={setFromCurrencyDropDown}
    favourite={favourite}
    />
      <div className="flex justify-center -mb-5 sm:mb-0"
      ><button 
      className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"><HiArrowsRightLeft className="text-xl text-gray-700"
      onClick={swapCurrencies}
      />
      </button></div>
    <CurrencyDropDown currencies={currencies} title="To:" handleFavourite={handleFavourite} 
    currency={toCurrencyDropDown}
    setCurrency={settoCurrencyDropDown}
    favourite={favourite}
    />
  </div>

  <div className="mt-4">
    <label
    value={amount}
    onChange={(e)=>setAmount(e.target.value)}
    htmlFor="amount" 
    className="block text-sm font-medium text-gray-700"
    >Amount</label>
    <input
     type="number"
     value={amount}
     className="w-full p-2 border-gray-50 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1" 
     onChange={(e)=>setAmount(e.target.value)}
     />
  </div>
  
  <div className="flex justify-between items-center mt-6">

  <div className="mt-4 text-3xl font-bold  text-green-700">
    {convertedAmount || "0"}
  </div>
  <button
    className={`px-5 py-2 bg-indigo-700 text-white rounded-md hover:bg-yellow-300 
    focus:outline-none focus:ring-2 Ifocus:ring-indigo-see focus:ring-offset-2 ${converting? "animate-pulse":""}`}
    onClick={convertCurrency}
    > Convert
  </button>   

  </div>
  
  </div>
  </>
  )
}export default Currency