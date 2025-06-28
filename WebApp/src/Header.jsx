import './App.css';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const roleId = localStorage.getItem('role_Id');

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className='w-full h-[120px] bg-red-500 text-white top-0 flex flex-row justify-evenly items-center px-8'>
      <div className='font-mono font-bold text-xl w-full flex justify-center '>
        MISFITS COMPANY DATABASE
      </div>
      <div className='flex gap-6 text-white font-mono w-full items-center justify-center '>
        <Link to="/Inventory" className="hover:underline">Inventory</Link>
        {roleId === "1" && <Link to="/Admin" className="hover:underline">Admin</Link>}
        {(roleId === "2" || roleId === "3") && (
          <Link to="/Dashboard" className="hover:underline">Dashboard</Link>
        )}
        
      </div>
      <div className="w-full  flex justify-end items-center">
        <button
          onClick={handleLogout}
          className="ml-4 px-4 py-2 bg-white text-red-500 rounded font-bold hover:bg-red-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;