import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import './styles.css';

interface Pagination {
  callbackPrevPage(): void
  callbackNextPage(): void
  currentPage: number
  totalPages: number
}

const Pagination: React.FC<Pagination> = (props) => (
  <div className="pagination">
    <button
      onClick={props.callbackPrevPage}
      title="Ir para página anterior"
      disabled={props.currentPage === 1}>
        <FaChevronLeft size={16} color="#FCFCFC" />
        Anterior
    </button>
    <button
      onClick={props.callbackNextPage}
      title="Ir para próxima página"
      disabled={props.currentPage === props.totalPages}>
        Próximo
        <FaChevronRight size={16} color="#FCFCFC" />
    </button>
  </div>
);

export default Pagination;
