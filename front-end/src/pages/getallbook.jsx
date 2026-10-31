import { useState } from "react";
import { BookOpen, Plus, Search } from "lucide-react";

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500";

const getBookId = (book) => book?.id ?? book?._id;

const GetAllBook = ({
    books,
    loading,
    error,
    onRetry,
    onCreate,
    onDetails,
    onEdit,
    onDelete
}) => {
    const [search, setSearch] = useState("");
    const filteredBooks = books.filter((book) =>
        `${book.title || ""} ${book.author || ""}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <main className="mx-auto min-h-screen max-w-7xl px-5 py-8 text-slate-800 lg:px-8">
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
                        Discover & Collect
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Explore Your Books
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Manage your collection and discover your next favorite read.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onCreate}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-indigo-700"
                >
                    <Plus size={20} />
                    Add New Book
                </button>
            </div>

            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                    <BookOpen className="text-indigo-600" size={23} />
                    <div>
                        <p className="text-sm text-slate-500">Total books</p>
                        <p className="text-2xl font-bold">{books.length}</p>
                    </div>
                </div>
                <div className="relative w-full md:max-w-sm">
                    <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="search"
                        placeholder="Search by title or author..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />
                </div>
            </div>

            {loading && (
                <p className="mb-5 text-center font-medium text-indigo-600">
                    Loading books...
                </p>
            )}
            {error && (
                <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
                    <p>{error}</p>
                    <button
                        type="button"
                        onClick={onRetry}
                        className="mt-2 font-semibold underline"
                    >
                        Try again
                    </button>
                </div>
            )}

            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredBooks.map((book) => (
                        <article
                            key={getBookId(book)}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                        >
                            <button
                                type="button"
                                onClick={() => onDetails(book)}
                                className="relative block h-64 w-full overflow-hidden bg-slate-100 text-left"
                            >
                                <img
                                    src={book.image || DEFAULT_IMAGE}
                                    alt={book.title || "Book cover"}
                                    onError={(event) => {
                                        event.currentTarget.src = DEFAULT_IMAGE;
                                    }}
                                    className="h-full w-full object-cover"
                                />
                                <span className="absolute right-4 top-4 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-indigo-700 shadow-sm">
                                    ${Number(book.price || 0).toFixed(2)}
                                </span>
                            </button>
                            <div className="p-5">
                                <p className="mb-2 text-sm font-medium">
                                    By <span className="font-bold text-indigo-600">{book.author}</span>
                                </p>
                                <h2 className="mb-3 text-xl font-bold text-slate-900">
                                    {book.title}
                                </h2>
                                <p className="mb-4 text-sm leading-6 text-slate-500">
                                    {(book.description || "").length > 100
                                        ? `${book.description.slice(0, 100)}...`
                                        : book.description}
                                </p>
                                <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(book)}
                                        className="rounded-lg bg-amber-50 px-2 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-100"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onDelete(book)}
                                        className="rounded-lg bg-rose-50 px-2 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-100"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onDetails(book)}
                                        className="rounded-lg bg-slate-100 px-2 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                !loading && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
                        <BookOpen className="mx-auto mb-4 text-slate-400" size={40} />
                        <h2 className="text-xl font-bold">
                            {search ? "No books match your search" : "No books found"}
                        </h2>
                        <p className="mt-2 text-slate-500">
                            {search
                                ? "Try another title or author."
                                : "Add a new book to get started."}
                        </p>
                    </div>
                )
            )}
        </main>
    );
};

export default GetAllBook;
