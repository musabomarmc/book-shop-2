import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emptyBook = {
    title: "",
    author: "",
    price: "",
    image: "",
    description: ""
};

const getInitialFormData = (book) => book
    ? {
        title: book.title || "",
        author: book.author || "",
        price: String(book.price ?? ""),
        image: book.image || "",
        description: book.description || ""
    }
    : emptyBook;

const UpdatedBook = ({ book, loading, onSave, onCancel }) => {
    const [formData, setFormData] = useState(() => getInitialFormData(book));
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const isEditing = Boolean(book);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const details = {
            title: formData.title.trim(),
            author: formData.author.trim(),
            price: Number(formData.price),
            image: formData.image.trim(),
            description: formData.description.trim()
        };

        if (
            !details.title ||
            !details.author ||
            !details.description ||
            formData.price === "" ||
            !Number.isFinite(details.price) ||
            details.price < 0
        ) {
            setError("Enter a title, author, valid price, and description.");
            return;
        }

        setSubmitting(true);
        setError("");
        try {
            await onSave(details);
        } catch (requestError) {
            setError(requestError.message || "Unable to save the book.");
        } finally {
            setSubmitting(false);
        }
    };

    const cancel = onCancel || (() => navigate("/books"));

    return (
        <main className="mx-auto min-h-screen max-w-2xl px-5 py-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    {isEditing ? "Update book" : "Add a book"}
                </h1>
                <p className="mt-2 text-slate-500">
                    Enter the book details and save your changes.
                </p>

                {error && (
                    <p role="alert" className="mt-4 rounded-lg bg-rose-50 p-3 text-rose-700">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <label className="block text-sm font-semibold text-slate-700">
                        Book title
                        <input
                            required
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        />
                    </label>
                    <label className="block text-sm font-semibold text-slate-700">
                        Author
                        <input
                            required
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        />
                    </label>
                    <label className="block text-sm font-semibold text-slate-700">
                        Price
                        <input
                            required
                            min="0"
                            step="0.01"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        />
                    </label>
                    <label className="block text-sm font-semibold text-slate-700">
                        Cover image URL (optional)
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        />
                    </label>
                    <label className="block text-sm font-semibold text-slate-700">
                        Description
                        <textarea
                            required
                            rows={5}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        />
                    </label>
                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={cancel}
                            className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting || loading}
                            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {submitting || loading
                                ? "Saving..."
                                : isEditing
                                    ? "Save changes"
                                    : "Add book"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default UpdatedBook;
