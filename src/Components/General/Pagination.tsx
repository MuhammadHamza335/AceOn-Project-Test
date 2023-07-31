import React from "react";
interface PaginationProps {
  offset: number;
  hasNext: boolean;
  onPrevClick: () => void;
  onNextClick: () => void;
}
const Pagination: React.FC<PaginationProps> = ({
  offset,
  hasNext,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="pagination">
      <button
        className="btn btn-note me-2"
        disabled={offset === 0}
        onClick={onPrevClick}
      >
        Prev
      </button>
      <button
        className="btn btn-note"
        disabled={!hasNext}
        onClick={onNextClick}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
