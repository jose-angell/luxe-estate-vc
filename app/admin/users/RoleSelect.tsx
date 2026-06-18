"use client";

import { useState, useRef, useEffect } from "react";
import { updateUserRoleAction } from "../actions";

export default function RoleSelect({
  userId,
  initialRole,
}: {
  userId: string;
  initialRole: "admin" | "user";
}) {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(initialRole);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = async (newRole: "admin" | "user") => {
    setIsOpen(false);
    if (newRole === role) return;
    
    setLoading(true);
    setError(null);
    const { success, error: actionError } = await updateUserRoleAction(
      userId,
      newRole
    );
    if (success) {
      setRole(newRole);
    } else {
      setError(actionError || "Error updating role");
    }
    setLoading(false);
  };

  const isAdmin = role === "admin";

  return (
    <div className="col-span-12 md:col-span-2 w-full flex justify-end relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className={`inline-flex items-center px-4 py-2 text-xs font-medium rounded-lg focus:outline-none transition-colors w-full md:w-auto justify-center ${
          isAdmin 
            ? "bg-mosque text-white shadow-md hover:bg-mosque/90" 
            : "border border-nordic-dark/10 bg-white dark:bg-gray-800 shadow-sm text-nordic-dark hover:bg-nordic-dark hover:text-white"
        }`}
      >
        {loading ? (
           <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
           </svg>
        ) : (
          <>
            Change Role
            <span className="material-icons text-[16px] ml-2">
              {isOpen ? "expand_less" : "expand_more"}
            </span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 rounded-lg shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] bg-mosque ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-50 origin-top-right animate-fade-in-up">
          <div aria-labelledby="options-menu" aria-orientation="vertical" className="py-1" role="menu">
            <button
              onClick={() => handleChange("admin")}
              className={`w-full group flex items-center px-4 py-3 text-xs transition-colors ${
                isAdmin 
                  ? "text-white bg-white/20 font-medium" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              role="menuitem"
            >
              <span className={`material-icons text-sm mr-3 ${isAdmin ? "text-white" : "text-white/50 group-hover:text-white"}`}>
                shield
              </span>
              Administrator
            </button>
            <button
              onClick={() => handleChange("user")}
              className={`w-full group flex items-center px-4 py-3 text-xs transition-colors ${
                !isAdmin 
                  ? "text-white bg-white/20 font-medium" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              role="menuitem"
            >
              <span className={`material-icons text-sm mr-3 ${!isAdmin ? "text-white" : "text-white/50 group-hover:text-white"}`}>
                person
              </span>
              User
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute top-full mt-12 right-0 text-[10px] text-red-500 whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm border border-red-100 z-50">
          {error}
        </div>
      )}
    </div>
  );
}
