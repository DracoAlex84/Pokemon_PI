import React from "react";

export default function Paginado({ page, cardPerPage, pokemons, pagination }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pokemons / cardPerPage); i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if(page < pageNumbers.length){
      pagination(page + 1)
    }
  };

  const prevPage = () => {
    if(page > 1){
      pagination(page - 1)
    }
  }; 
  return (
    <div className='pagination__container'>
      <button className= 'pagination-btn' onClick={prevPage} disabled={page === 1}>
        Prev
      </button>
      {pageNumbers?.map((number) => (
        <button
          className={
            page === number ? "active pagination-btn" : "pagination-btn"
          }
          key={number}
          onClick={() => pagination(number)}
        >
          <p className="pagination">{number}</p>
        </button>
      ))}
      <button className='pagination-btn' onClick={nextPage} disabled={page === pageNumbers.length}>
        Next
        </button>
    </div>
  );
}
