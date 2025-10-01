import './App.css';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full bg-[#eb0505] text-white mt-auto'>
      {/* Main Footer Content */}
      <div className='px-8 py-8'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
          
          {/* Company Info */}
          <div className='col-span-1 md:col-span-2'>
            <h3 className='font-mono font-bold text-xl mb-4 text-white'>
              TOYOZU COMPANY
            </h3>
            <p className='font-mono text-sm text-red-100 mb-4 leading-relaxed'>
              Your trusted partner in inventory management and database solutions. 
              Streamlining operations with precision and reliability.
            </p>
            <div className='flex flex-col gap-2 text-sm font-mono text-red-100'>
              <div>⟟ 123 Monteverde Street, Davao City, Philippines</div>
              <div>📞 +81-3-1234-5678</div>
              <div>✉️ info@toyozu.com</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='font-mono font-bold text-lg mb-4 text-white'>
              Quick Links
            </h4>
            <ul className='flex flex-col gap-2 font-mono text-sm'>
              <li><Link to="/Inventory" className="text-red-100 hover:text-white hover:underline">Inventory</Link></li>
              <li><Link to="/Dashboard" className="text-red-100 hover:text-white hover:underline">Dashboard</Link></li>
              <li><Link to="/Start" className="text-red-100 hover:text-white hover:underline">Getting Started</Link></li>
              <li><Link to="/Index" className="text-red-100 hover:text-white hover:underline">Index</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='font-mono font-bold text-lg mb-4 text-white'>
              Support
            </h4>
            <ul className='flex flex-col gap-2 font-mono text-sm'>
              <li><a href="#" className="text-red-100 hover:text-white hover:underline">Help Center</a></li>
              <li><a href="#" className="text-red-100 hover:text-white hover:underline">Documentation</a></li>
              <li><a href="#" className="text-red-100 hover:text-white hover:underline">Contact Support</a></li>
              <li><a href="#" className="text-red-100 hover:text-white hover:underline">System Status</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-[#eb0505] px-8 py-4'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='font-mono text-sm text-red-100'>
            © {currentYear} Toyozu Company. All rights reserved.
          </div>
          <div className='flex gap-6 font-mono text-sm'>
            <a href="#" className="text-red-100 hover:text-white hover:underline">Privacy Policy</a>
            <a href="#" className="text-red-100 hover:text-white hover:underline">Terms of Service</a>
            <a href="#" className="text-red-100 hover:text-white hover:underline">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;