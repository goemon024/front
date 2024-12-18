const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const maxVisiblePages = 5; // 表示するページ番号の最大数
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
    return (
      <div className="pagination">
        {/* 前へボタン */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo; 前へ
        </button>
  
        {/* ページ番号ボタン */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const page = startPage + index;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          );
        })}
  
        {/* 次へボタン */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          次へ &raquo;
        </button>
      </div>
    );
  };
  
  export default Pagination;
  