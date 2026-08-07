import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


const TaskListPagination = ({handlePageNext, handlePagePrev, handlePageChange, totalPages, page}) => {
    const generatePage = () => {
        const pages = [];
        if(totalPages <= 4) {
            for(let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if(page <= 2){
                pages.push(1,2,3,"...", totalPages);
            } else if(page === totalPages - 1) {
                pages.push(1,"...",totalPages-2, totalPages-1, totalPages);
            } else {
                pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
            }
        }
        return pages;
    }

    const pagesToShow = generatePage();

    return (
        <div className="flex justify-between items-center">
            <Pagination>
            <PaginationContent>
                <PaginationItem>
                <PaginationPrevious onClick={() => page ===1 ? undefined : handlePagePrev()} />
                </PaginationItem>
                {pagesToShow.map((pageNumber, index) => (
                    <PaginationItem key={index}>
                        {
                            pageNumber === "..." ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink 
                                    onClick={() => handlePageChange(pageNumber)}>
                                    {pageNumber}
                                </PaginationLink>
                            )
                        }
                    </PaginationItem>
                ))}
                <PaginationItem>
                <PaginationNext onClick={() => page === totalPages ? undefined : handlePageNext()} />
                </PaginationItem>
            </PaginationContent>
            </Pagination>
        </div>
    );
};
export default TaskListPagination;