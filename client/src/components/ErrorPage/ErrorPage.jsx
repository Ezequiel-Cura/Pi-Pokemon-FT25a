import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./ErrorPage.module.css"
import confused_pikachu from "../../multimedia/confuse_pikachu.png"
import bored_pikachu from "../../multimedia/bored_pikachu.jpg"

export default function ErrorPage() {
  return (
    <div className={styles.error_cointainer}>
        <div className={styles.false_bg}></div>
        <Link to="/home">
            <button>Volver al Home</button>
        </Link>
        <h1>ERROR VOLVETE AL INICIO</h1>
        <img src={confused_pikachu} alt="Not found" className={styles.img_confuse}/>
        <img src={bored_pikachu} alt="Not found" className={styles.img_bored}/>
        <img src="https://loginportal.funnyjunk.com/comments/Wat+_cfe56e05699857cb89d486b11a4a505e.png"
         alt="" className={styles.img_dank}/>
         <img src="https://c.tenor.com/LmoTSIbR8wEAAAAC/buff-pikachu.gif"
          alt="" className={styles.img_muscle}/>
    </div>
  )
}

