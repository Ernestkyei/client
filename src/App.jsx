import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import BundlesPage from './pages/BundlesPage';
import TrackPage from './pages/TrackPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentCallbackPage from './pages/PaymentCallbackPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bundles/:network" element={<BundlesPage />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/payment/callback" element={<PaymentCallbackPage />} />
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
