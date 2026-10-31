import { createContext, useCallback, useContext, useState } from "react";

const apiContext = createContext();

export const Apiprovider = ({ children }) => {
    const [Loading, setLoading] = useState(false);
    const [user, setuser] = useState(null);

    // REGISTER
    const Registration = async (userInfo) => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/sign_up", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(userInfo)
            });

            const data = await res.json();

            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message || "Registration failed");
            }
        } catch (error) {
            console.log("Registration error:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // LOGIN
    const login = async (credentials) => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(credentials)
            });

            const data = await res.json();

            if (res.ok) {
                setuser(data.data);
                sessionStorage.setItem("user", JSON.stringify(data.data));
                return data;
            } else {
                throw new Error(data.message || "Sign in failed");
            }
        } catch (error) {
            console.log("Login error:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // GET ALL BOOKS
    const getBooks = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/books/");
            const data = await res.json();

            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message || "Failed to get books");
            }
        } catch (error) {
            console.log("Get books error:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // CREATE BOOK
    const createBook = async (bookInfo) => {
        setLoading(true);
        try {
            const res = await fetch("/api/books/", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(bookInfo)
            });

            const data = await res.json();

            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message || "Failed to create book");
            }
        } catch (error) {
            console.log("Create book error:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // GET BOOK BY ID
    const getBookById = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/books/${encodeURIComponent(id)}`);
            const data = await res.json();

            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message || "Failed to get book");
            }
        } catch (error) {
            console.log("Get book error:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // UPDATE BOOK
    const updateBook = async (id, updatedBook) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/books/${encodeURIComponent(id)}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(updatedBook)
            });

            const data = await res.json();

            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message || "Failed to update book");
            }
        } catch (error) {
            console.log("Update book error:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // DELETE BOOK
    const deleteBook = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/books/${encodeURIComponent(id)}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message || "Failed to delete book");
            }
        } catch (error) {
            console.log("Delete book error:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        Registration,
        login,
        getBooks,
        createBook,
        getBookById,
        updateBook,
        deleteBook,
        Loading,
        user
    };

    return (
        <apiContext.Provider value={value}>
            {children}
        </apiContext.Provider>
    );
};

export const useApi = () => {
    const Contex = useContext(apiContext);

    if (!Contex) {
        throw new Error("use api must be used within an apiprovider");
    }

    return Contex;
};