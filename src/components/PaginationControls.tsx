import React from "react";
import "../styles/PaginationControls.css";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const PaginationControls: React.FC<Props> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="pagination-controls">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
