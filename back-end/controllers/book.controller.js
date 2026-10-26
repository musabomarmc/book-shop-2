import bookTable from "../models/book.model.js";

// CREATE BOOK
export const createBook = async (req, res) => {
    const { title, author, price, image, description } = req.body;

    if (!title || !author || price === undefined || !description) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the required fields"
        });
    }

    try {
        const newBook = new bookTable({
            title,
            author,
            price,
            image,
            description
        });

        const savedBook = await newBook.save();

        return res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: savedBook
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// GET ALL BOOKS
export const getBooks = async (req, res) => {
    try {
        const books = await bookTable.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            data: books
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// GET BOOK BY ID
export const getBookById = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await bookTable.findById(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book fetched successfully",
            data: book
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// UPDATE BOOK
export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, price, image, description } = req.body;

    try {
        const updatedBook = await bookTable.findByIdAndUpdate(
            id,
            {
                title,
                author,
                price,
                image,
                description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// DELETE BOOK
export const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await bookTable.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: deletedBook
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
