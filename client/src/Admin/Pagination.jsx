import React from "react";

function Pagination({ total, pageNumber, handleChangePage, currentPage }) {
  const toArray = (number) => {
    let arr = [];
    for (let i = 0; i < number; i++) {
      arr.push("");
    }
    return arr;
  };
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {toArray(Math.ceil(total / pageNumber)).map((e, i) => (
            <li class={`page-item${currentPage === i + 1 && "active"}`}>
              <button class="page-link" onClick={() => handleChangePage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}

          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
