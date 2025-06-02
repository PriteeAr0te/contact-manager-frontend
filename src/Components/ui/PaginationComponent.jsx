export default function PaginationComponent({ currentPage, totalPages, onPageChange }) {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-500 bg-transparent px-4 py-4 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                        Page <span className="font-medium">{currentPage}</span> of{' '}
                        <span className="font-medium">{totalPages}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm border-gray-500">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => onPageChange(currentPage - 1)}
                            className="relative inline-flex items-center rounded-l-md pl-3 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed hover:text-gray-800"
                        >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                            </span>
                        </button>

                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset text-gray-800 dark:text-gray-400 ring-gray-300 hover:bg-gray-50 ${page === currentPage
                                    ? 'z-10 bg-indigo-600 text-white dark:text-white hover:text-gray-800'
                                    : 'text-gray-900'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => onPageChange(currentPage + 1)}
                            className="relative inline-flex items-center rounded-r-md px-2 pr-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed hover:text-gray-800"
                        >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>
                            </span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
