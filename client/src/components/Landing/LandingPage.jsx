import React from 'react'
import {Link} from "react-router-dom"
import "./LandingPage.css"

export default function LandingPage() {
  return (
    <div className='landingPage'>
      
      <h1>Pokemon Api</h1>
      <Link to={"/home"}>Ingresar</Link>
    </div>
  )
}
