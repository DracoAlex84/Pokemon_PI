import React from "react";

export default function Paginado({ page, cardPerPage, pokemons, pagination }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pokemons / cardPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination__container'>
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
    </div>
  );
}
