import { useState } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      {/* Dropdown toggle button */}
      <button onClick={toggleDropdown}>
        <span className="mx-1">Jane Doe</span>
        
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)} className="origin-top-right absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800" >
          <a
            href="#"
            className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            
            <div className="mx-1">
              <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Jane Doez
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                janedoe@exampl.com
              </p>
            </div>
          </a>

          
        </div>
      )}
    </div>
  );
};

export default Dropdown;
