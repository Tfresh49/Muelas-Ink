
"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push(-1); // Represents an ellipsis
      }
      if (currentPage > 2) {
        pageNumbers.push(currentPage - 1);
      }
      if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(currentPage);
      }
      if (currentPage < totalPages - 1) {
        pageNumbers.push(currentPage + 1);
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push(-1); // Represents an ellipsis
      }
      pageNumbers.push(totalPages);
    }
    return [...new Set(pageNumbers)]; // Remove duplicates
  };

  const pages = getPageNumbers();

  return (
    <nav className={cn("flex items-center gap-2", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous Page</span>
      </Button>

      {pages.map((page, index) =>
        page === -1 ? (
          <span key={`ellipsis-${index}`} className="flex h-10 w-10 items-center justify-center">
            <MoreHorizontal className="h-4 w-4" />
          </span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next Page</span>
      </Button>
    </nav>
  );
}
