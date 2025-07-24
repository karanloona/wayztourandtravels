import Logo from '../assets/img/logo_white.png';

const Footer = () => {
    return (
        <footer className="text-white body-font bg-[#0c1b2b]">
            <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center">
                        <img src={Logo} alt="Nature" className="h-16 w-24" />
                    </a>
                    <p className="mt-2 text-sm opacity-75">We are passionate about crafting unforgettable travel experiences, ensuring comfort, adventure, and seamless journeys.</p>
                </div>
                <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                    <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                        {/* <h2 className="title-font font-medium tracking-widest text-sm mb-3">Quick Links</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a href="#home" className="text-white hover:bg-[#D4AF37] hover:text-[#0c1b2b] p-2 rounded transition-colors duration-300">Home</a>
                            </li>
                            <li>
                                <a href="#about" className="text-white hover:bg-[#D4AF37] hover:text-[#0c1b2b] p-2 rounded transition-colors duration-300">About</a>
                            </li>
                            <li>
                                <a href="#tour-information" className="text-white hover:bg-[#D4AF37] hover:text-[#0c1b2b] p-2 rounded transition-colors duration-300">Tour Info</a>
                            </li>
                            <li>
                                <a href="#gallery" className="text-white hover:bg-[#D4AF37] hover:text-[#0c1b2b] p-2 rounded transition-colors duration-300">Gallery</a>
                            </li>
                        </nav> */}
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                        {/* <h2 className="title-font font-medium tracking-widest text-sm mb-3">IMPORTANT LINKS</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a href="#terms" className="text-white hover:bg-[#D4AF37] hover:text-[#0c1b2b] p-2 rounded transition-colors duration-300">Terms & Conditions</a>
                            </li>
                            <li>
                                <a href="#privacy" className="text-white hover:bg-[#D4AF37] hover:text-[#0c1b2b] p-2 rounded transition-colors duration-300">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#faq" className="text-white hover:bg-[#D4AF37] hover:text-[#0c1b2b] p-2 rounded transition-colors duration-300">FAQ</a>
                            </li>
                            <li>
                                <a href="#support" className="text-white hover:bg-[#D4AF37] hover:text-[#0c1b2b] p-2 rounded transition-colors duration-300">Support</a>
                            </li>
                        </nav> */}
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium tracking-widest text-sm mb-3">CONTACT US</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a href="mailto:info@wayztourandtravels.ca" className="text-white hover:bg-[#D4AF37] hover:text-[#0c1b2b] p-2 rounded transition-colors duration-300">info@wayztourandtravels.ca</a>
                            </li>
                            <li>
                                <a href="#location" className="text-white hover:bg-[#D4AF37] hover:text-[#0c1b2b] p-2 rounded transition-colors duration-300">Mississauga, Ontario, Canada</a>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="bg-[#D4AF37]">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-[#0c1b2b] text-sm text-center sm:text-left">© 2025 Wayz Travels & Tours</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer