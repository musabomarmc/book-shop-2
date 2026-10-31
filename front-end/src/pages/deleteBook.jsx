import { useState } from "react";

const DeleteBook = ({ book, loading, onConfirm, onCancel }) => {
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        setError("");
        try {
            await onConfirm();
        } catch (requestError) {
            setError(requestError.message || "Unable to delete the book.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <main className="mx-auto min-h-screen max-w-xl px-5 py-16">
            <section className="rounded-2xl border border-rose-200 bg-white p-7 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">Delete book?</h1>
                <p className="mt-3 leading-7 text-slate-600">
                    This will permanently delete{" "}
                    <span className="font-semibold">{book.title}</span> from your collection.
                </p>
                {error && (
                    <p role="alert" className="mt-4 rounded-lg bg-rose-50 p-3 text-rose-700">
                        {error}
                    </p>
                )}
                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting || loading}
                        className="rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {deleting || loading ? "Deleting..." : "Delete book"}
                    </button>
                </div>
            </section>
        </main>
    );
};

export default DeleteBook;
