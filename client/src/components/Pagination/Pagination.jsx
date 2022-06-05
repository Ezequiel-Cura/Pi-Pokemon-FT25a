import React from 'react'

import styles from "./Pagination.module.css"

export default function Pagination({pokePerPage,totalPoke,paginate}) {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPoke/pokePerPage);i++ ){
    pageNumbers.push(i)
    // console.log("EN EL FOR")
  }

  return (
    <div className={styles.pagination_cointainer}>
      {pageNumbers?.map((num) => (
        <div key={num} onClick={()=>paginate(num)} className={styles.pagination}>
          <span>
            {num} 
          </span>
        </div>
      ))}
    </div>
  )
}
