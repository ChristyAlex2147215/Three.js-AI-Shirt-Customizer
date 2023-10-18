import React from 'react'
import state from "../store"
import { useSnapshot } from 'valtio'

const CustomButton = ({title,type,customStyles,handleClick}) => {
  
  const snap=useSnapshot(state);
    const generateStyle=(type)=>
  {
    if(type==="filled")
    {
        return{
            backgroundColor:snap.color,
            color:"#fff"
        }
    }
    else if(type ==="outline")
    {
      return{
        borderWidth:"1px",borderColor:snap.color,color:snap.color
      }
    }
  }
  
    return (
    <button onClick={handleClick} className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`} style={generateStyle(type)}>{title}</button>
  )
}

export default CustomButton