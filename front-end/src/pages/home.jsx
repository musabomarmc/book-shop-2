
import React, { useState } from "react";
import { Search, Plus, BookOpen, Pencil, Trash2, Eye, Save, X, ChevronRight } from "lucide-react";

const initialBooks = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        price: 18.99,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
        description:
            "A practical guide to building good habits, breaking bad ones, and making small changes that lead to remarkable results.",
    },
    {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 14.5,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
        description:
            "A young shepherd travels in search of treasure and discovers the importance of following his dreams.",
    },
    {
        id: 3,
        title: "Deep Work",
        author: "Cal Newport",
        price: 21,
        image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500",
        description:
            "Learn how to focus without distraction on cognitively demanding tasks and produce meaningful work.",
    },
    {
        id: 4,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: 17.25,
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500",
        description:
            "Timeless lessons on wealth, greed, happiness, and how your behavior shapes your financial decisions.",
    },
    {
        id: 5,
        title: "Rich Dad Poor Dad",
        author: "Robert T. Kiyosaki",
        price: 16.75,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
        description:
            "Explore different attitudes toward money, financial independence, investing, and building wealth.",
    },
    {
        id: 6,
        title: "Think and Grow Rich",
        author: "Napoleon Hill",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500",
        description:
            "A classic personal development book about goal setting, persistence, and developing a success-oriented mindset.",
    },
];

const emptyBook = {
    title: "",
    author: "",
    price: "",
    image: "",
    description: "",
};

const Home = () => {

    const [books, setBooks] = useState(initialBooks);
    const [search, setSearch] = useState("");
    const [editingBook, setEditingBook] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [formData, setFormData] = useState({ ...emptyBook });

    const filteredBooks = books.filter((book) => `${book.title} ${book.author}`.toLowerCase().includes(search.toLowerCase()));

    const openAddForm = () => {
        setEditingBook(null);
        setFormData({ ...emptyBook });
        setShowForm(true);
    };

    const openEditForm = (book) => {
        setEditingBook(book.id);
        setFormData({ ...book, price: String(book.price) });
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingBook(null);
        setFormData({ ...emptyBook });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookData = {
            ...formData,
            price: Number(formData.price),
            image:
                formData.image.trim() ||
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
        };

        if (editingBook !== null) {
            setBooks((prev) =>
                prev.map((book) =>
                    book.id === editingBook ? { ...book, ...bookData } : book
                )
            );

            setSelectedBook((prev) =>
                prev?.id === editingBook ? { ...prev, ...bookData } : prev
            );
        } else {
            setBooks((prev) => [...prev, { ...bookData, id: Date.now() }]);
        }

        closeForm();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            setBooks((prev) => prev.filter((book) => book.id !== id));
            setSelectedBook((prev) => (prev?.id === id ? null : prev));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* Page content only — no navbar or footer */}
            <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
                
                {/* Page title and Add New Book button */}
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
                        onClick={openAddForm}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                    >
                        <Plus size={20} />
                        Add New Book
                    </button>
                </div>

                {/* Stats and search */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                            <BookOpen size={23} />
                        </div>
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
                            type="text"
                            placeholder="Search by title or author..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        />
                    </div>
                </div>

                {/* Book grid */}
                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredBooks.map((book) => (
                            <article
                                key={book.id}
                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="relative h-64 overflow-hidden bg-slate-100">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500";
                                        }}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <span className="absolute right-4 top-4 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-indigo-700 shadow-sm">
                                        ${Number(book.price).toFixed(2)}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <p className="mb-2 text-sm font-medium">
                                        By <span className="text-indigo-600 font-bold">{book.author}</span>
                                    </p>

                                    <h2 className="mb-3 text-xl font-bold text-slate-900">
                                        {book.title}
                                    </h2>

                                    <p className="mb-4 text-sm leading-6 text-slate-500">
                                        {book.description.length > 25
                                            ? `${book.description.slice(0, 25)}........more..`
                                            : book.description}
                                    </p>

                                    {/* Book actions */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => openEditForm(book)}
                                            className="flex items-center justify-center gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-100"
                                        >
                                            <Pencil size={16} /> Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(book.id)}
                                            className="flex items-center justify-center gap-2 rounded-lg bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-100"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setSelectedBook(book)}
                                            className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                                        >
                                            <Eye size={16} /> Details
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
                        <BookOpen
                            className="mx-auto mb-4 text-slate-400"
                            size={40}
                        />
                        <h2 className="text-xl font-bold">No books found</h2>
                        <p className="mt-2 text-slate-500">
                            Try another search or add a new book.
                        </p>
                    </div>
                )}
            </main>

            {/* Add / Edit modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {editingBook !== null ? "Edit Book" : "Add New Book"}
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Enter the book information below.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeForm}
                                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                                aria-label="Close form"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {[
                                { name: "title", label: "Book title", type: "text" },
                                { name: "author", label: "Author", type: "text" },
                                { name: "price", label: "Price ($)", type: "number" },
                                { name: "image", label: "Image URL (optional)", type: "url" },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label
                                        htmlFor={field.name}
                                        className="mb-1.5 block text-sm font-semibold text-slate-700"
                                    >
                                        {field.label}
                                    </label>
                                    <input
                                        id={field.name}
                                        required={field.name !== "image"}
                                        type={field.type}
                                        name={field.name}
                                        min={field.type === "number" ? "0" : undefined}
                                        step={field.type === "number" ? "0.01" : undefined}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                    />
                                </div>
                            ))}

                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    required
                                    name="description"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
                                >
                                    <Save size={18} />
                                    {editingBook !== null ? "Update Book" : "Add Book"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Book details modal */}
            {selectedBook && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                            <h2 className="text-lg font-bold">Book Details</h2>
                            <button
                                type="button"
                                onClick={() => setSelectedBook(null)}
                                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                                aria-label="Close details"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2">
                            <img
                                src={selectedBook.image}
                                alt={selectedBook.title}
                                className="h-72 w-full object-cover sm:h-full sm:min-h-80"
                            />

                            <div className="p-6 sm:p-8">
                                <p className="mb-2 text-sm font-semibold text-indigo-600">
                                    {selectedBook.author}
                                </p>
                                <h3 className="text-2xl font-bold">
                                    {selectedBook.title}
                                </h3>
                                <p className="mt-4 text-2xl font-bold text-indigo-700">
                                    ${Number(selectedBook.price).toFixed(2)}
                                </p>
                                <p className="mt-5 text-sm leading-7 text-slate-600">
                                    {selectedBook.description}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        const book = selectedBook;
                                        setSelectedBook(null);
                                        openEditForm(book);
                                    }}
                                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
                                >
                                    <Pencil size={17} /> Edit Book
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
