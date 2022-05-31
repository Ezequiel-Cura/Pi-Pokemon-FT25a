import React from 'react'

export default function Pagination({pokePerPage,totalPoke,paginate}) {
  const pageNumbers = [];

  // console.log("PER PAGE",pokePerPage,"TOTALPOKE",totalPoke);
  // console.log("CALCULO",Math.ceil(totalPoke/pokePerPage));

  for(let i = 1; i <= Math.ceil(totalPoke/pokePerPage);i++ ){
    pageNumbers.push(i)
    // console.log("EN EL FOR")
  }

  


  return (
    <div className='pagination_cointainer'>
      {pageNumbers?.map((num) => (
        <div key={num} onClick={()=>paginate(num)} >
          <span>
            {num} 
          </span>
        </div>
      ))}
    </div>
  )
}
