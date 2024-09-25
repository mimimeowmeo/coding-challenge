// components/Pagination.js
"use client";
import React, { useMemo } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = useMemo(() => {
    const newPages = [];
    if (currentPage > 3) {
      const startPage =
        currentPage + 2 >= totalPages ? totalPages - 4 : currentPage - 2;
      const endPage = Math.min(currentPage + 2, totalPages);
      for (let i = startPage; i <= endPage; i++) {
        newPages.push(i);
      }
    } else {
      const endPage = Math.min(5, totalPages);
      for (let i = 1; i <= endPage; i++) {
        newPages.push(i);
      }
    }
    return newPages;
  }, [currentPage, totalPages]);

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
      >
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
      >
        Previous
      </button>
      {pages[0] !== 1 && <span className="px-3">...</span>}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-blue-200 hover:bg-blue-400"
          }`}
        >
          {page}
        </button>
      ))}
      {pages[pages.length - 1] !== totalPages && (
        <span className="px-3">...</span>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
