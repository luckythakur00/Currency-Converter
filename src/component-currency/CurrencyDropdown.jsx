import React from 'react'

function CurrencyDropdown({
    curency,
    setCurrencyy,
    selectCurrency= []
}) {
  return (
    <>
        <select value={curency} onChange={(e)=> setCurrencyy(e.target.value) } className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
        {selectCurrency.map((crr)=> {
            return(
                <option className="bg-gray-200" value={crr} key={crr}> {crr} </option>
            )
        })}
        </select>
    </>
  )
}

export default CurrencyDropdown