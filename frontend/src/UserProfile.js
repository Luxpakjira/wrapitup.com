import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import Cookies from 'js-cookie';

function UserProfile() {
  const [profile, setProfile] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch('/getUserProfile')
      .then((response) => response.json())
      .then((data) => {
        setProfile({ image_url: data.image_url, email: data.email, name: data.name });
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Add event listener to close the dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  
  const signOutClicked = () =>{
       Cookies.remove("Lux's Cookie");
    };
  
  return (
    <div>
      <nav className="bg-gray-900">
        <div className="max-w-screen flex flex-wrap rounded-lg justify-between mx-5 p-4">
          <div>
            <a href="#" className="flex items-center">
              <span className="self-center text-2xl font-semibold text-spotify-green">Wrap It Up</span>
            </a>
          </div>
          <div className="ml-auto relative" ref={dropdownRef}>
            <button
              type="button"
              className="dropdown flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={toggleDropdown}
            >
              <img className="w-12 h-12 rounded-full" src={profile.image_url} alt="user photo" />
            </button>

            {isDropdownOpen && (
              <div className="dropdown-content absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900">{profile.name}</span>
                  <span className="block text-sm text-gray-700 dark:text-white">{profile.email}</span>
                </div>
                <ul className="py-2">
                  <li>
                    <a
                      href="http://localhost:3000/"  onClick={signOutClicked}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="bg-gray-900 grid h-[55rem] place-items-center flex ">
          <h1 className="self-center text-6xl font-semibold text-white">Hi!, {profile.name}</h1>
          <h1 className="self-center text-6xl font-semibold text-comp-pink">Check out your Spotify data</h1>
        </div>
      </nav>
    </div>
  );
}

export default UserProfile;
