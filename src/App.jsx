import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyinfo.js'
import InputBox from './components/inputBox.jsx'

function App() {
  const [amount, setAmount] = useState(0)
  const[from, setFrom] = useState("usd")
  const[to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo || {})

 const swap = () => {
  setFrom(to)
  setTo(from)
  setConvertedAmount(amount)
  setAmount(convertedAmount)
}

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
   <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat" style={{backgroundImage: `url(https://images.pexels.com/photos/4695995/pexels-photo-4695995.jpeg?_gl=1*1nt77cu*_ga*MTAzNzM4MTY4Ni4xNzkwMzE1Njk4*_ga_8JE65Q40S6*czE3OTM1MzgzOTgkbzMkZzEkdDE3OTM1Mzg0MTMkajQ1JGwwJGgw)`}}>

    <div className='w-full'>
      <div className='w-full max-w-md mx-auto border border-gray-300 rounded-lg p-5 bg-white/80 backdrop-blur-sm text-black'>
       <form onSubmit={(e) => {
         e.preventDefault()
         convert()
       }}>
        <div className='w-full mb-1'>
          <InputBox
          label="From"
          amount={amount}
          onAmountChange={(amount) => setAmount(amount)}
          onCurrencyChange={(currency) => setFrom(currency)}
          currencyOptions={options}
          selectedCurrency={from}
          />
        </div>
        <div className="w-full h-0.5 relative">
          <button className=" absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md px-2 py-0.5 bg-blue-600 text-white" onClick={swap}>swap</button>
        </div>

        <div className='w-full mb-1'>
          <InputBox
          label="To"
          amount={convertedAmount}
          // onAmountChange={(amount) => setConvertedAmount(amount)}
          onCurrencyChange={(currency) => setTo(currency)}
          currencyOptions={options}
          selectedCurrency={to}
          />
        </div>

        <button type="submit" className='w-full bg-blue-500 text-white py-2 rounded-lg mt-3'>Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
       </form>
      </div>

    </div>
    
   </div>
  )
}

export default App
