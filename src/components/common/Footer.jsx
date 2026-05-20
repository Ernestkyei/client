import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">KIDAVE DATA SERVICE</h3>
            <p className="text-gray-400 text-sm">Fast, secure, and reliable digital platform for purchasing affordable mobile data bundles.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/track" className="hover:text-white">Track Orders</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>MTN Data Bundles</li>
              <li>AirtelTigo Data</li>
              <li>Telecel Data</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>+233 24 540 6569</li>
              <li>kwamedavide60@gmail.com</li>
              <li>Nsawam, Ghana</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} kidave data services All rights reserved. Developed by Ernest Kyei</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
