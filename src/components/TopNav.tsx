'use client';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, LogIn, X } from 'react-feather';
import Link from 'next/link';

const TopNav = () => {
  const router = useRouter();
  const menuItems = [
    { title: 'About', link: '/about' },
    { title: 'Contact', link: '/contact' },
    { title: 'Request car', link: '/request' },
  ];

  const handleBack = () => {
    router.back();
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <button type="button" onClick={toggle}>
        <Menu />
      </button>
      <button type="button" onClick={handleBack}>
        <LogIn />
      </button>

      {/* Off-canvas menu */}
      <div
        className={`fixed inset-0 bg-gray-900 transition-opacity ease-linear duration-300 z-50 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-6">
          <button onClick={toggle} className="h-4 flex justify-end">
            <X className="inline" />
          </button>
          <ul className="text-xl pt-4">
            {menuItems.map((item) => (
              <li
                key={item.link}
                className="my-4 border-b border-gray-300 pb-2"
              >
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
