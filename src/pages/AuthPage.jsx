import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, LogIn, Eye, EyeOff, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { api } from '../services/api';

function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const result = await api.login({ email, password });
        
        if (result.success) {
          localStorage.setItem('accessToken', result.data.accessToken);
          localStorage.setItem('refreshToken', result.data.refreshToken);
          localStorage.setItem('userEmail', result.data.user.email);
          
          toast.success(`Welcome back, ${result.data.user.name}! 🎉`, {
            duration: 3000,
            position: 'top-center',
          });
          
          setTimeout(() => {
            navigate('/');
            window.location.reload();
          }, 1500);
        } else {
          toast.error(result.message || 'Login failed', {
            duration: 3000,
            position: 'top-center',
          });
        }
      } else {
        const result = await api.register({ email, password, name });
        
        if (result.success) {
          toast.success('Account created successfully! 🎉 Please login.', {
            duration: 4000,
            position: 'top-center',
          });
          
          setIsLogin(true);
          setEmail('');
          setPassword('');
          setName('');
        } else {
          toast.error(result.message || 'Registration failed', {
            duration: 3000,
            position: 'top-center',
          });
        }
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.', {
        duration: 3000,
        position: 'top-center',
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full shadow-xl border border-stone-200 rounded-2xl overflow-hidden">
        <CardHeader className="text-center pt-8 pb-4">
          <div className="mx-auto w-16 h-16 bg-green-900 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-900/20">
            {isLogin ? <LogIn className="w-8 h-8 text-green-300" /> : <User className="w-8 h-8 text-green-300" />}
          </div>
          <CardTitle className="text-3xl font-bold text-green-950 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <p className="text-stone-500 text-sm">
            {isLogin ? 'Sign in to your account to continue' : 'Join us and start buying data bundles'}
          </p>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-900/20 focus:border-green-900 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-900/20 focus:border-green-900 transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-900/20 focus:border-green-900 transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} className="text-stone-400" /> : <Eye size={16} className="text-stone-400" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-green-900 hover:bg-green-950 text-green-100 font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-green-900/20"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>

            <p className="text-center text-sm text-stone-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
                className="text-green-900 hover:text-green-950 font-semibold"
              >
                {isLogin ? 'Create account' : 'Sign In'}
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthPage;