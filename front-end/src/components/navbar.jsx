
import React, { useState } from 'react';
import { BookOpen, UserRound, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState(false);

    return (
        <nav className="w-full bg-white shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Bookshop Title */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-bold text-amber-700"
                >
                    <BookOpen size={30} />
                    <span>Soomaali books</span>
                </Link>

                {/* User: Sign In or Profile */}
                {user ? (
                    <button
                        onClick={() => console.log('Open profile')}
                        className="flex items-center gap-2 rounded-lg bg-amber-100 px-4 py-2 font-medium text-amber-800 transition hover:bg-amber-200"
                    >
                        <UserRound size={20} />
                        <span>Profile</span>
                    </button>
                ) : (
                    <Link
                        to="/sign-in"
                        className="flex items-center gap-2 rounded-lg bg-amber-700 px-4 py-2 font-medium text-white transition hover:bg-amber-800"
                    >
                        <LogIn size={20} />
                        <span>Sign In</span>
                    </Link>
                )}

            </div>
        </nav>
    );
};

export default Navbar;
