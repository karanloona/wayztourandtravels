import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/about.css";

const Gallery = () => {
  const wowInstanceRef = useRef(null);
  const imageUrls = [
    // The Best of Niagara Falls
    "https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlhZ2FyYSUyMGZhbGxzfGVufDB8fDB8fHww", // Niagara Falls overview

    // Exciting Kashmir Vacation
    "https://www.canadianimmigration.com/media/Banff-Alberta.jpg", // Dal Lake, Srinagar
    "https://www.oldportofmontreal.com/sites/default/files/styles/facebook/public/2025-05/vp_01.jpg", // Kashmir valley landscape
    "https://i.natgeofe.com/n/720ceef5-db9c-4531-b164-aa091c133b0f/upper-town-winter-old-quebec-city-canada.jpg", // Gulmarg scenery

    // Other Tourist Places
    "https://offtracktravel.ca/wp-content/uploads/2019/01/gemma-quebec-city-wits-canada.jpeg", // Eiffel Tower, Paris
    "https://lp-cms-production.imgix.net/2024-03/shutterstockRF151560857.jpg?fit=crop&ar=1%3A1&w=1200&auto=format&q=75", // Colosseum, Rome
    "https://www.ontarioaway.com/wp-content/uploads/2019/08/toronto-tourist-attractions-city-skyline.jpg",  // Taj Mahal, India
    "https://www.canadianaffair.com/uploads/2022/02/iStock-1216659104_Peggys_Cove_Lighthouse_Nova_Scotia.jpg"
  ];
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState([]);
  
  useEffect(() => {
    // Load WOW.js only once when component mounts
    let wow = null;
    
    
    // Preload images
    const preloadImages = async () => {
      const loadPromises = imageUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(url);
          img.onerror = () => resolve(null);
        });
      });
    
      const loaded = await Promise.all(loadPromises);
      setLoadedImages(loaded.filter((url) => url !== null));
      setLoading(false);
      
      // Always call sync after loading new content regardless of MutationObserver support
      if (wowInstanceRef.current) {
        setTimeout(() => {
          wowInstanceRef.current.sync();
        }, 300); // Add a small delay to ensure DOM is updated
      }
    };
    
    preloadImages();
    
    // Clean up function
    return () => {
      // Any cleanup if needed
    };
  }, [imageUrls]);

  const openFullscreen = (index) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  // Handle clicks outside the image to close the fullscreen view
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeFullscreen();
    }
  };

  // Function to manually trigger WOW sync when needed
  const syncWowAnimations = () => {
    if (wowInstanceRef.current) {
      wowInstanceRef.current.sync();
    }
  };

  // Call sync whenever images are loaded
  useEffect(() => {
    if (!loading && wowInstanceRef.current) {
      syncWowAnimations();
    }
  }, [loading]);

  return (
    <section id="gallery" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="section-title text-center">
          <span className="text-[#D4AF37] text-base sm:text-lg font-bold">Gallery</span>
          <h2 className="text-5xl sm:text-6xl font-bold mt-2 text-[#0c1b2b] leading-tight break-words">Explore Our Travel Moments</h2>
          <p className="text-gray-600 text-sm sm:text-base mx-auto">
            Make a glimpse into breathtaking destinations, unforgettable adventures,
            <br /> and cherished memories captured by our travelers.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-20">
            {loadedImages.map((url, index) => (
              <motion.div
                key={index}
                className="wow fadeIn overflow-hidden rounded-lg shadow-md cursor-pointer h-40 sm:h-52 md:h-64 relative"
                data-wow-delay={`${index * 0.1}s`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                onClick={() => openFullscreen(index)}
              >
                <img 
                  src={url} 
                  alt={`Travel moment ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClick}
            >
              <motion.div
                className="relative max-w-4xl w-full h-auto max-h-[80vh]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <button
                  onClick={closeFullscreen}
                  className="absolute -top-12 right-0 text-white text-3xl font-bold hover:text-yellow-400 transition-colors z-10"
                >
                  &times;
                </button>
                
                <img
                  src={loadedImages[selectedImage]}
                  alt={`Travel moment ${selectedImage + 1}`}
                  className="w-full h-full object-contain rounded"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-60 text-white rounded-b">
                  <p className="text-sm sm:text-base">
                    {selectedImage === 0 && "Niagara Falls - One of nature's most magnificent spectacles"}
                    {selectedImage === 1 && "Banff, Alberta - Iconic Destination In the Canadian Rockies"}
                    {selectedImage === 2 && "The Old Port of Montreal's - Forever Young"}
                    {selectedImage === 3 && "Quebec City's - Don de Dieu feray valoir"}
                    {selectedImage === 4 && "Ottawa's - Canada in one city"}
                    {selectedImage === 5 && "British Columbia - Super, Natural British Columbia"}
                    {selectedImage === 6 && "Toronto's - Diversity Our Strength"}
                    {selectedImage === 7 && "Nova Scotia's - Canada's Ocean Playground"}
                  </p>
                </div>
                
                {/* Navigation buttons */}
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => (prev > 0 ? prev - 1 : loadedImages.length - 1));
                    }}
                    className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-r"
                  >
                    &#10094;
                  </button>
                </div>
                
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage((prev) => (prev < loadedImages.length - 1 ? prev + 1 : 0));
                    }}
                    className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-l"
                  >
                    &#10095;
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;