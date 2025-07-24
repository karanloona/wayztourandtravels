import React from "react";
import { useEffect } from "react";
import { WOW } from "wowjs";

const destinations = [
  { name: "INDONESIA", lat: "47.1388422", lon: "72.9917328", flag: "https://wanderland.qodeinteractive.com/wp-content/uploads/2019/10/h1-img-06.png" },
  { name: "GREAT BRITAIN", lat: "47.1388422", lon: "72.9917328", flag: "https://wanderland.qodeinteractive.com/wp-content/uploads/2019/10/h1-img-25-1.png" },
  { name: "FRANCE", lat: "47.1388422", lon: "72.9917328", flag: "https://upload.wikimedia.org/wikipedia/commons/6/62/Flag_of_France.png" },
  { name: "GERMANY", lat: "47.1388422", lon: "72.9917328", flag: "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg" },
];

const Testimonials = () => {
    
  return (
    <div className="relative">
         <div className="section-title text-center mt-20 wow fadeInDown" data-wow-duration="1s">
           <span className="text-[#D4AF37] text-base sm:text-lg font-bold">Testimonials</span>
            <h2 className="animate__animated animate__fadeInUp text-5xl sm:text-6xl font-bold mt-2 text-[#0c1b2b] leading-tight break-words">What Our Travelers Say</h2>
            <p class="mt-3 pb-10 animate__animated animate__fadeInUp text-gray-600 text-sm sm:text-base mx-auto">
                Hear from our happy travelers about their incredible experiences with us. <br />
                Their stories and feedback inspire us to create even better journeys for you.
            </p>
        </div>

        <img className="absolute" src="https://themexriver.com/wp/goyto/wp-content/uploads/2024/03/shape-2.webp" />
        <img className="absolute right-0" src="https://themexriver.com/wp/goyto/wp-content/uploads/2024/03/shape-3.webp" />
        
        <section className="overflow-hidden relative min-h-screen grid grid-cols-1 lg:grid-cols-12 place-content-center lg:place-items-center lg:gap-16 max-w-7xl mx-auto px-6 py-10">
            <div className="relative z-10 mb-10 lg:mb-0 col-span-6">
                <h1 className="relative z-10 sm:text-5xl text-3xl 2xl:text-6xl font-bold sm:leading-snug 2xl:leading-tight">Bringing value <br />across different brands.</h1>
                <p className="mt-4 mb-7 text-gray-500 max-w-sm 2xl:text-lg 2xl:mt-4 2xl:mb-8">Over 7 brands in all sizes use <a href="#" className="text-orange-400 hover:underline">Branchify</a> to understand their business and customers better.</p>
                <a href="#" className="inline-block rounded-full  py-2.5 px-10 font-bold bg-[#D4AF37] text-[#0c1b2b] hover:shadow-lg 2xl:py-3 2xl:px-12">Read success stories</a>
            </div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-5 col-span-6">
                <div className="relative z-10 bg-white shadow-[0_5px_30px_-15px_rgba(0,0,0,0.3)] rounded-sm flex flex-col lg:items-center justify-between lg:flex-row gap-10 p-7">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.082 475.081" x="0px" y="0px" width="25px" height="25px">
                    <g>
                        <g>
                        <path d="M 164.45 219.27 h -63.954 c -7.614 0 -14.087 -2.664 -19.417 -7.994 c -5.327 -5.33 -7.994 -11.801 -7.994 -19.417 v -9.132 c 0 -20.177 7.139 -37.401 21.416 -51.678 c 14.276 -14.272 31.503 -21.411 51.678 -21.411 h 18.271 c 4.948 0 9.229 -1.809 12.847 -5.424 c 3.616 -3.617 5.424 -7.898 5.424 -12.847 V 54.819 c 0 -4.948 -1.809 -9.233 -5.424 -12.85 c -3.617 -3.612 -7.898 -5.424 -12.847 -5.424 h -18.271 c -19.797 0 -38.684 3.858 -56.673 11.563 c -17.987 7.71 -33.545 18.132 -46.68 31.267 c -13.134 13.129 -23.553 28.688 -31.262 46.677 C 3.855 144.039 0 162.931 0 182.726 v 200.991 c 0 15.235 5.327 28.171 15.986 38.834 c 10.66 10.657 23.606 15.985 38.832 15.985 h 109.639 c 15.225 0 28.167 -5.328 38.828 -15.985 c 10.657 -10.663 15.987 -23.599 15.987 -38.834 V 274.088 c 0 -15.232 -5.33 -28.168 -15.994 -38.832 C 192.622 224.6 179.675 219.27 164.45 219.27 Z" />
                        <path d="M 459.103 235.256 c -10.656 -10.656 -23.599 -15.986 -38.828 -15.986 h -63.953 c -7.61 0 -14.089 -2.664 -19.41 -7.994 c -5.332 -5.33 -7.994 -11.801 -7.994 -19.417 v -9.132 c 0 -20.177 7.139 -37.401 21.409 -51.678 c 14.271 -14.272 31.497 -21.411 51.682 -21.411 h 18.267 c 4.949 0 9.233 -1.809 12.848 -5.424 c 3.613 -3.617 5.428 -7.898 5.428 -12.847 V 54.819 c 0 -4.948 -1.814 -9.233 -5.428 -12.85 c -3.614 -3.612 -7.898 -5.424 -12.848 -5.424 h -18.267 c -19.808 0 -38.691 3.858 -56.685 11.563 c -17.984 7.71 -33.537 18.132 -46.672 31.267 c -13.135 13.129 -23.559 28.688 -31.265 46.677 c -7.707 17.987 -11.567 36.879 -11.567 56.674 v 200.991 c 0 15.235 5.332 28.171 15.988 38.834 c 10.657 10.657 23.6 15.985 38.828 15.985 h 109.633 c 15.229 0 28.171 -5.328 38.827 -15.985 c 10.664 -10.663 15.985 -23.599 15.985 -38.834 V 274.088 C 475.082 258.855 469.76 245.92 459.103 235.256 Z" />
                        </g>
                    </g>

                    </svg>
                    <p className="my-3 2xl:text-lg">This product really helped my brand expand in a very manageable way. Would really use this for any future expansion.</p>
                    <p className="text-gray-400"><span className="name text-gray-900 capitalize font-bold">timothy quano</span> &#8212; Symph, Designer </p>
                </div>
                <div className="relative shrink-0">
                    <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Timothy Quano" className="rounded-full w-24 h-24 object-cover 2xl:w-28 2xl:h-28" />
                    <div className="rounded-full w-24 h-24 2xl:w-28 2xl:h-28 bg-gradient-to-r from-[#deb2b280] to-[#deb2b280] absolute inset-0"></div>
                </div>
                </div>
                <div className="relative z-10 bg-white shadow-[0_5px_30px_-15px_rgba(0,0,0,0.3)] rounded-sm flex flex-col lg:items-center justify-between lg:flex-row gap-10 p-7">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.082 475.081" x="0px" y="0px" width="25px" height="25px" >
                    <g>
                        <g>
                        <path d="M 164.45 219.27 h -63.954 c -7.614 0 -14.087 -2.664 -19.417 -7.994 c -5.327 -5.33 -7.994 -11.801 -7.994 -19.417 v -9.132 c 0 -20.177 7.139 -37.401 21.416 -51.678 c 14.276 -14.272 31.503 -21.411 51.678 -21.411 h 18.271 c 4.948 0 9.229 -1.809 12.847 -5.424 c 3.616 -3.617 5.424 -7.898 5.424 -12.847 V 54.819 c 0 -4.948 -1.809 -9.233 -5.424 -12.85 c -3.617 -3.612 -7.898 -5.424 -12.847 -5.424 h -18.271 c -19.797 0 -38.684 3.858 -56.673 11.563 c -17.987 7.71 -33.545 18.132 -46.68 31.267 c -13.134 13.129 -23.553 28.688 -31.262 46.677 C 3.855 144.039 0 162.931 0 182.726 v 200.991 c 0 15.235 5.327 28.171 15.986 38.834 c 10.66 10.657 23.606 15.985 38.832 15.985 h 109.639 c 15.225 0 28.167 -5.328 38.828 -15.985 c 10.657 -10.663 15.987 -23.599 15.987 -38.834 V 274.088 c 0 -15.232 -5.33 -28.168 -15.994 -38.832 C 192.622 224.6 179.675 219.27 164.45 219.27 Z" />
                        <path d="M 459.103 235.256 c -10.656 -10.656 -23.599 -15.986 -38.828 -15.986 h -63.953 c -7.61 0 -14.089 -2.664 -19.41 -7.994 c -5.332 -5.33 -7.994 -11.801 -7.994 -19.417 v -9.132 c 0 -20.177 7.139 -37.401 21.409 -51.678 c 14.271 -14.272 31.497 -21.411 51.682 -21.411 h 18.267 c 4.949 0 9.233 -1.809 12.848 -5.424 c 3.613 -3.617 5.428 -7.898 5.428 -12.847 V 54.819 c 0 -4.948 -1.814 -9.233 -5.428 -12.85 c -3.614 -3.612 -7.898 -5.424 -12.848 -5.424 h -18.267 c -19.808 0 -38.691 3.858 -56.685 11.563 c -17.984 7.71 -33.537 18.132 -46.672 31.267 c -13.135 13.129 -23.559 28.688 -31.265 46.677 c -7.707 17.987 -11.567 36.879 -11.567 56.674 v 200.991 c 0 15.235 5.332 28.171 15.988 38.834 c 10.657 10.657 23.6 15.985 38.828 15.985 h 109.633 c 15.229 0 28.171 -5.328 38.827 -15.985 c 10.664 -10.663 15.985 -23.599 15.985 -38.834 V 274.088 C 475.082 258.855 469.76 245.92 459.103 235.256 Z" />
                        </g>
                    </g>

                    </svg>
                    <p className="my-3 2xl:text-lg">Scalability will never be and issue now for my brand!</p>
                    <p className="text-gray-400"><span className="name text-gray-900 capitalize font-bold">Jane Doe</span> &#8212; ANI, CEO </p>
                </div>
                <div className="relative shrink-0">
                    <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Jane Doe" className="rounded-full w-24 h-24 2xl:w-28 2xl:h-28 object-cover" />
                    <div className="rounded-full w-24 h-24 2xl:w-28 2xl:h-28 bg-gradient-to-r from-[#deb2b280] to-[#deb2b280] absolute inset-0"></div>
                </div>
                </div>
                <div className="relative z-10 bg-white shadow-[0_5px_30px_-15px_rgba(0,0,0,0.3)] rounded-sm flex flex-col lg:items-center justify-between lg:flex-row gap-10 p-7">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.082 475.081" x="0px" y="0px" width="25px" height="25px" >
                    <g>
                        <g>
                        <path d="M 164.45 219.27 h -63.954 c -7.614 0 -14.087 -2.664 -19.417 -7.994 c -5.327 -5.33 -7.994 -11.801 -7.994 -19.417 v -9.132 c 0 -20.177 7.139 -37.401 21.416 -51.678 c 14.276 -14.272 31.503 -21.411 51.678 -21.411 h 18.271 c 4.948 0 9.229 -1.809 12.847 -5.424 c 3.616 -3.617 5.424 -7.898 5.424 -12.847 V 54.819 c 0 -4.948 -1.809 -9.233 -5.424 -12.85 c -3.617 -3.612 -7.898 -5.424 -12.847 -5.424 h -18.271 c -19.797 0 -38.684 3.858 -56.673 11.563 c -17.987 7.71 -33.545 18.132 -46.68 31.267 c -13.134 13.129 -23.553 28.688 -31.262 46.677 C 3.855 144.039 0 162.931 0 182.726 v 200.991 c 0 15.235 5.327 28.171 15.986 38.834 c 10.66 10.657 23.606 15.985 38.832 15.985 h 109.639 c 15.225 0 28.167 -5.328 38.828 -15.985 c 10.657 -10.663 15.987 -23.599 15.987 -38.834 V 274.088 c 0 -15.232 -5.33 -28.168 -15.994 -38.832 C 192.622 224.6 179.675 219.27 164.45 219.27 Z" />
                        <path d="M 459.103 235.256 c -10.656 -10.656 -23.599 -15.986 -38.828 -15.986 h -63.953 c -7.61 0 -14.089 -2.664 -19.41 -7.994 c -5.332 -5.33 -7.994 -11.801 -7.994 -19.417 v -9.132 c 0 -20.177 7.139 -37.401 21.409 -51.678 c 14.271 -14.272 31.497 -21.411 51.682 -21.411 h 18.267 c 4.949 0 9.233 -1.809 12.848 -5.424 c 3.613 -3.617 5.428 -7.898 5.428 -12.847 V 54.819 c 0 -4.948 -1.814 -9.233 -5.428 -12.85 c -3.614 -3.612 -7.898 -5.424 -12.848 -5.424 h -18.267 c -19.808 0 -38.691 3.858 -56.685 11.563 c -17.984 7.71 -33.537 18.132 -46.672 31.267 c -13.135 13.129 -23.559 28.688 -31.265 46.677 c -7.707 17.987 -11.567 36.879 -11.567 56.674 v 200.991 c 0 15.235 5.332 28.171 15.988 38.834 c 10.657 10.657 23.6 15.985 38.828 15.985 h 109.633 c 15.229 0 28.171 -5.328 38.827 -15.985 c 10.664 -10.663 15.985 -23.599 15.985 -38.834 V 274.088 C 475.082 258.855 469.76 245.92 459.103 235.256 Z" />
                        </g>
                    </g>

                    </svg>
                    <p className="my-3 2xl:text-lg">The product is really easy to use that I didn't have to set a trainning for my employees.</p>
                    <p className="text-gray-400"><span className="name text-gray-900 capitalize font-bold">rowen smith</span> &#8212; Golden Bowl, CEO </p>
                </div>
                <div className="relative shrink-0">
                    <img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Rowen Smith" className="rounded-full w-24 h-24 2xl:w-28 2xl:h-28 object-cover" />
                    <div className="rounded-full w-24 h-24 2xl:w-28 2xl:h-28 bg-gradient-to-r from-[#deb2b280] to-[#deb2b280] absolute inset-0"></div>
                </div>
                </div>
                <div className="hidden xl:block absolute bottom-[-6rem] right-[25rem] w-72 h-72 bg-amber-50 rounded-full"></div>
            </div>
        </section>
    </div>
  );
};

export default Testimonials;
