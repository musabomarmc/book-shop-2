const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500";

const DescriptionPage = ({ book, onEdit, onDelete, onBack }) => (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-10">
        <button
            type="button"
            onClick={onBack}
            className="mb-6 font-semibold text-indigo-700 hover:underline"
        >
            Back to books
        </button>
        <article className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
            <img
                src={book.image || DEFAULT_IMAGE}
                alt={book.title || "Book cover"}
                onError={(event) => {
                    event.currentTarget.src = DEFAULT_IMAGE;
                }}
                className="h-80 w-full bg-slate-100 object-cover md:h-full"
            />
            <div className="p-6 sm:p-9">
                <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                    Book details
                </p>
                <h1 className="mt-3 text-3xl font-bold text-slate-900">
                    {book.title}
                </h1>
                <p className="mt-2 text-lg text-slate-600">By {book.author}</p>
                <p className="mt-5 text-2xl font-bold text-indigo-700">
                    ${Number(book.price || 0).toFixed(2)}
                </p>
                <h2 className="mt-8 text-lg font-bold text-slate-900">Description</h2>
                <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-600">
                    {book.description || "No description provided."}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={onEdit}
                        className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600"
                    >
                        Edit book
                    </button>
                    <button
                        type="button"
                        onClick={onDelete}
                        className="rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white hover:bg-rose-700"
                    >
                        Delete book
                    </button>
                </div>
            </div>
        </article>
    </main>
);

export default DescriptionPage;
