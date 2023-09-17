import Link from 'next/link';
import React from 'react';

const AppNavbar = () => {
  return (
    <nav className="mt-8 mb-2">
      <ul className="flex justify-center gap-8">
        <li className="font-semibold hover:text-cyan-300 text-lg text-cyan-50 transition-colors">
          <Link href="/">Tasks</Link>
        </li>
        <li className="font-semibold hover:text-cyan-300 text-lg text-cyan-50 transition-colors">
          <Link href="/new">New</Link>
        </li>
        <li className="font-semibold hover:text-cyan-300 text-lg text-cyan-50 transition-colors">
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNavbar;
