// src/components/Footer.jsx

import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* Section des contributeurs */}
                <div className="mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold">Contributeurs :</h2>
                    <p className="text-sm">ACHKHITY YASSINE & ASSIM AYOUB</p>
                </div>

                {/* Section des contacts */}
                <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
                    <div className="flex items-center mb-2 md:mb-0 md:mr-6">
                        <FaPhoneAlt className="mr-2" />
                        <a href="tel:+212762343816" className="hover:text-white">
                            (+212) 762343816
                        </a>
                    </div>
                    <div className="flex items-center">
                        <FaEnvelope className="mr-2" />
                        <a href="mailto:yassineachkhity56@gmail.com" className="hover:text-white">
                            yassineachkhity56@gmail.com
                        </a>
                    </div>
                </div>

                {/* Section du copyright */}
                <div className="text-sm">
                    &copy; {new Date().getFullYear()} MarketplaceApp. Tous droits réservés.
                </div>
            </div>

            {/* Section des réseaux sociaux */}
            <div className="container mx-auto px-4 mt-4 flex justify-center space-x-6">
                <a href="https://github.com/Yassineachkhity" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    <FaGithub size={24} />
                </a>
                <a href="https://linkedin.com/in/yassineachkhity" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    <FaLinkedin size={24} />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
