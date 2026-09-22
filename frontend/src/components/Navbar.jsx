import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useLocation} from "react-router-dom";
import { useProjectStore } from "../store/useProjectStore";
import { useChannelStore } from "../store/useChannelStore";

const Navbar = () => {
const { authUser, logout, checkAuth, isAdmin} = useAuthStore();
  const {toggleAddProject} = useProjectStore()
  const {toggleAddChannel} = useChannelStore()
  const {selectedProject} = useProjectStore()
  
  const initial = authUser?.user.fullName?.[0]?.toUpperCase() || "U";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
     logout()      
  }

  if (!authUser) {
    return(
      <div>loading....</div>
    )
  }
  const location = useLocation()
//  console.log(location.pathname);
 
  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-10 py-4"
      style={{ background: "#10151C" }}
    >
      <div className="flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#FF6B4A" }}
        />
        <Link
          className="text-lg"
          style={{ fontFamily: "'Fraunces', serif", color: "#F4F1EC" }}
          to={"/dashboard"}
        >
          BrieflyAI
        </Link>
      </div>

      <div className="flex items-center gap-4">
       

        {isAdmin && location.pathname == "/dashboard" ?
        
        <button
          type="button"
          onClick={() => {
            toggleAddProject()
          }}
          className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors hover:opacity-90"
          style={{ background: "#FF6B4A", color: "#1A0F0B" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1A0F0B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span className="hidden sm:inline cursor-pointer">Add new project</span>
        </button>
        :
        null
      }

      {isAdmin && location.pathname == `/channel/${selectedProject?.name}` ?
        
        <button
          type="button"
          onClick={() => {
            toggleAddChannel()
          }}
          className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors hover:opacity-90"
          style={{ background: "#FF6B4A", color: "#1A0F0B" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1A0F0B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span className="hidden sm:inline cursor-pointer">Add new channel</span>
        </button>
        :
        null
      }
       

        {/* Profile position — dropdown wired up */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center cursor-pointer gap-2 rounded-full pl-1 pr-3 py-1 transition-colors hover:bg-white/5"
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold"
              style={{ background: "#FF6B4A", color: "#1A0F0B" }}
            >
              {initial}
            </span>
            <span className="hidden sm:inline text-sm" style={{ color: "#C7CFD9" }}>
              {authUser?.user.fullName || "Profile"}
              <br />
             <p className="text-[10px] text-gray-400" > {authUser?.user.position || ""}</p>
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8B96A5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: isMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {isMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden shadow-lg"
              style={{ background: "#1A2028", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  /* TODO: navigate to profile/settings */
                }}
                className="w-full text-left px-4 py-2.5 text-sm cursor-pointer hover:bg-white/5"
                style={{ color: "#C7CFD9" }}
              >
                Settings
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  handleLogout(e)
                }}
                className="w-full text-left px-4 cursor-pointer py-2.5 text-sm hover:bg-white/5"
                style={{ color: "#FF6B4A" }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;