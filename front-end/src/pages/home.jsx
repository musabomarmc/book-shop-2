import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useApi } from "../context/api.context.jsx";
import DeleteBook from "./deleteBook.jsx";
import DescriptionPage from "./descriptionPage.jsx";
import GetAllBook from "./getallbook.jsx";
import UpdatedBook from "./updatedbook.jsx";

const getBookId = (book) => book?.id ?? book?._id;

const getBookList = (result) => {
    if (Array.isArray(result)) return result;
    if (Array.isArray(result?.data)) return result.data;
    if (Array.isArray(result?.data?.books)) return result.data.books;
    if (Array.isArray(result?.books)) return result.books;
    return [];
};

const BookRoute = ({ books, onEdit, onDelete, onConfirmDelete, loading }) => {
    const { id } = useParams();
    const book = books.find((item) => String(getBookId(item)) === id);
    const navigate = useNavigate();

    if (!book && loading) {
        return (
            <p className="mx-auto max-w-3xl px-5 py-16 text-center font-medium text-indigo-600">
                Loading book...
            </p>
        );
    }

    if (!book) {
        return (
            <div className="mx-auto max-w-3xl px-5 py-16 text-center">
                <h1 className="text-2xl font-bold">Book not found</h1>
                <button
                    type="button"
                    onClick={() => navigate("/books")}
                    className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white"
                >
                    Back to books
                </button>
            </div>
        );
    }

    return (
        <Routes>
            <Route
                index
                element={
                    <DescriptionPage
                        book={book}
                        onEdit={() => onEdit(book)}
                        onDelete={() => onDelete(book)}
                        onBack={() => navigate("/books")}
                    />
                }
            />
            <Route
                path="edit"
                element={
                    <UpdatedBook
                        key={String(getBookId(book))}
                        book={book}
                        loading={loading}
                        onSave={(details) => onEdit(book, details)}
                        onCancel={() => navigate(`/books/${id}`)}
                    />
                }
            />
            <Route
                path="delete"
                element={
                    <DeleteBook
                        book={book}
                        loading={loading}
                        onConfirm={() => onConfirmDelete(book)}
                        onCancel={() => navigate(`/books/${id}`)}
                    />
                }
            />
        </Routes>
    );
};

const Home = () => {
    const {
        getBooks,
        createBook,
        updateBook,
        deleteBook,
        Loading
    } = useApi();
    const [books, setBooks] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchBooks = useCallback(async () => {
        setFetching(true);
        setError("");
        try {
            setBooks(getBookList(await getBooks()));
        } catch (requestError) {
            console.error("Failed to fetch books:", requestError.message);
            setError(requestError.message || "Failed to load books.");
        } finally {
            setFetching(false);
        }
    }, [getBooks]);

    useEffect(() => {
        let active = true;
        getBooks()
            .then((result) => {
                if (active) setBooks(getBookList(result));
            })
            .catch((requestError) => {
                console.error("Failed to fetch books:", requestError.message);
                if (active) {
                    setError(requestError.message || "Failed to load books.");
                }
            })
            .finally(() => {
                if (active) setFetching(false);
            });

        return () => {
            active = false;
        };
    }, [getBooks]);

    const handleCreate = async (bookData) => {
        try {
            await createBook(bookData);
            await fetchBooks();
            navigate("/books");
        } catch (requestError) {
            console.error("Book creation failed:", requestError.message);
            throw requestError;
        }
    };

    const handleEdit = async (book, updatedBook) => {
        if (updatedBook === undefined) {
            navigate(`/books/${getBookId(book)}/edit`);
            return;
        }

        try {
            const result = await updateBook(getBookId(book), updatedBook);
            const savedBook = result?.data ?? updatedBook;
            setBooks((previous) =>
                previous.map((item) =>
                    String(getBookId(item)) === String(getBookId(book))
                        ? { ...item, ...savedBook }
                        : item
                )
            );
            navigate(`/books/${getBookId(book)}`);
        } catch (requestError) {
            console.error("Book update failed:", requestError.message);
            throw requestError;
        }
    };

    const handleDelete = async (book) => {
        if (!book) return;
        try {
            await deleteBook(getBookId(book));
            setBooks((previous) =>
                previous.filter(
                    (item) => String(getBookId(item)) !== String(getBookId(book))
                )
            );
            navigate("/books");
        } catch (requestError) {
            console.error("Book deletion failed:", requestError.message);
            throw requestError;
        }
    };

    const showLoading = fetching || Loading;

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <GetAllBook
                        books={books}
                        loading={showLoading}
                        error={error}
                        onRetry={fetchBooks}
                        onCreate={() => navigate("/books/new")}
                        onDetails={(book) => navigate(`/books/${getBookId(book)}`)}
                        onEdit={handleEdit}
                        onDelete={(book) =>
                            navigate(`/books/${getBookId(book)}/delete`)
                        }
                    />
                }
            />
            <Route
                path="/books"
                element={
                    <GetAllBook
                        books={books}
                        loading={showLoading}
                        error={error}
                        onRetry={fetchBooks}
                        onCreate={() => navigate("/books/new")}
                        onDetails={(book) => navigate(`/books/${getBookId(book)}`)}
                        onEdit={handleEdit}
                        onDelete={(book) =>
                            navigate(`/books/${getBookId(book)}/delete`)
                        }
                    />
                }
            />
            <Route
                path="/books/new"
                element={
                    <UpdatedBook
                        loading={Loading}
                        onSave={handleCreate}
                        onCancel={() => navigate("/books")}
                    />
                }
            />
            <Route
                path="/books/:id/*"
                element={
                    <BookRoute
                        books={books}
                        loading={Loading}
                        onEdit={handleEdit}
                        onDelete={(book) =>
                            navigate(`/books/${getBookId(book)}/delete`)
                        }
                        onConfirmDelete={handleDelete}
                    />
                }
            />
            <Route
                path="*"
                element={
                    <div className="p-12 text-center">
                        <h1 className="text-2xl font-bold">Page not found</h1>
                        <button
                            type="button"
                            onClick={() => navigate("/books")}
                            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white"
                        >
                            Browse books
                        </button>
                    </div>
                }
            />
        </Routes>
    );
};

export default Home;