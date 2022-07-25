import React from 'react'

import styles from "./Pagination.module.css"

export default function Pagination({pokePerPage,totalPoke,paginate,currentPage}) {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPoke/pokePerPage);i++ ){
    pageNumbers.push(i)
  }

  return (
    <div className={styles.pagination_cointainer}>
      {pageNumbers?.map((num) => (
        num !== currentPage ?
        <div key={num} onClick={()=>paginate(num)} className={styles.pagination}>
          <span>
            {num} 
          </span>
        </div>
        :
        
        <div key={num} onClick={()=>paginate(num)} className={styles.currentPage}>
          <span>
            {num} 
          </span>
        </div>
      ))}
    </div>
  )
}
