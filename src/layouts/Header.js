import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../assets/img/logo_white.png';
import { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className="header-2 fixed top-0 z-20 w-full">
            <nav className="bg-[#0c1b2b] py-2 md:py-4">
                <div className="container px-4 mx-auto md:flex md:items-center">
                    <div className="flex justify-between items-center">
                        <a href="/" className="font-bold text-xl">
                            <img src={Logo} alt="Nature" className="h-8 w-20 md:h-14 md:w-36" />
                        </a>
                        <button
                            className="border border-solid border-white px-3 py-1 rounded text-white opacity-75 hover:opacity-100 md:hidden"
                            onClick={toggleNav}
                            aria-label="Toggle navigation"
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>

                    <div
                        className={`${
                            isNavOpen ? 'block' : 'hidden'
                        } md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0 transition-all duration-300 ease-in-out`}
                        id="navbar-collapse"
                    >
                        <a
                            href="/#home"
                            className="p-2 lg:px-4 md:mx-2 text-white bg-[#0c1b2b] rounded hover:bg-[#D4AF37] hover:text-[#0c1b2b] transition-colors duration-300 block md:inline-block"
                            onClick={() => setIsNavOpen(false)}
                        >
                            Home
                        </a>
                        {/* <a
                            href="/#about"
                            className="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-[#D4AF37] hover:text-[#0c1b2b] transition-colors duration-300 block md:inline-block"
                            onClick={() => setIsNavOpen(false)}
                        >
                            About
                        </a> */}
                        <a
                            href="/#tour-information"
                            className="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-[#D4AF37] hover:text-[#0c1b2b] transition-colors duration-300 block md:inline-block"
                            onClick={() => setIsNavOpen(false)}
                        >
                            Tour Info
                        </a>
                        <a
                            href="/#gallery"
                            className="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-[#D4AF37] hover:text-[#0c1b2b] transition-colors duration-300 block md:inline-block"
                            onClick={() => setIsNavOpen(false)}
                        >
                            Gallery
                        </a>
                        <a
                            href="/booking"
                            className="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-[#D4AF37] hover:text-[#0c1b2b] transition-colors duration-300 block md:inline-block"
                            onClick={() => setIsNavOpen(false)}
                        >
                            Booking Status
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}