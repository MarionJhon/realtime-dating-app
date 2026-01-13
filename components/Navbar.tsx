"use client";
import { useAuth } from "@/contexts/auth-context";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

const NavBar = () => {
  const { signOut, user } = useAuth();
  const navigation = [
    {
      name: "Discover",
      href: "/matches",
      hover: "hover:text-pink-600 dark:hover:text-pink-400",
    },
    {
      name: "Matches",
      href: "/matches/list",
      hover: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      name: "Message",
      href: "/chat",
      hover: "hover:text-green-600 dark:hover:text-green-400",
    },
    {
      name: "Profile",
      href: "/profile",
      hover: "hover:text-purple-600 dark:hover:text-purple-400",
    },
  ];

  return (
    <div className="relative z-50 bg-slate-900 border-b border-gray-200/5 dark-border-gray-700/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold text-linear-to-r  bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              Steam Match
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((nav, idx) => (
              <Link
                href={nav.href}
                key={idx}
                className={`text-gray-700 dark:text-gray-300  font-medium transition-colors duration-200 ${nav.hover}`}
              >
                {nav.name}
              </Link>
            ))}
          </div>

          {user ? (
            <button
              onClick={signOut}
              className="inline-flex items-center py-2 px-4 bg-linear-to-r from-pink-500 to-red-500 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth"
              className="inline-flex items-center py-2 px-4 bg-linear-to-r from-emerald-500 to-green-500 text-white text-sm font-medium rounded-lg hover:from-emirald-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
