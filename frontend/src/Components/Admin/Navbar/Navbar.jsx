import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AdminLogout } from "../../../Redux/AdminAuth";

function Navbar() {
    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(AdminLogout());
        navigate("/");
    };

    return (
   <>
  <div className="w-screen ">
    <section className="relative mx-auto">
      {/* navbar */}
      <nav className="flex justify-between bg-gray-900 text-white w-screen ">
        <div className="px-5 xl:px-12 py-6 flex w-full justify-between items-center">
          <Link to="/"className="text-3xl font-bold font-heading" >
            
            GROCERY.
          </Link>
     
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            <li><Link
                to="/"className="hover:text-gray-200"> HOME</Link></li>
            <li><Link
                to="/addproduct"className="hover:text-gray-200"> ADD PRODUCT</Link></li>
          </ul>
         
          <div className="hidden xl:flex items-center space-x-5">
            
            <h5 onClick={logout}>Logout</h5>
          </div>
        </div>
        {/* Responsive navbar */}
        
        <p className="navbar-burger self-center mr-12 md:hidden" onClick={() => setIsMenuToggled(!isMenuToggled)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </p>
      </nav>
    </section>
  </div>

  <div className="absolute bottom-0 right-0 mb-4 mr-4 z-10 ">
    <div>
     
    </div>
  </div>
  { isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-slate-400 drop-shadow-xl">
          {/* CLOSE ICON */}
          <div className="flex justify-end pt-12 ">
          <p className="navbar-burger self-center mr-12 md:hidden" onClick={() => setIsMenuToggled(!isMenuToggled)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </p>
          </div>

          {/* MENU ITEMS */}
          <div className="ml-[33%] flex flex-col gap-5 jusify-center text-xl mt-12">
          <Link
                to="/"className="hover:text-gray-200 text-white"> home </Link>
          <Link
                to="/addproduct"className="hover:text-gray-200 text-white"> Add product</Link>
                 <p className="hover:text-gray-200 text-white"> Logout </p>
          </div>
        </div>
      )}

</>

    );
}

export default Navbar;
