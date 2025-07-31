import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Settings, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { setupFarmerAccount, checkFarmerAccount } from '@/lib/setupFarmerAccount';
import { testFarmerLogin } from '@/lib/testFarmerLogin';

const FarmerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('test@nareshwadi.in');
  const [password, setPassword] = useState('farmer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [setupMessage, setSetupMessage] = useState('');

  const handleSetupAccount = async () => {
    setSetupMessage('Setting up farmer account...');
    const result = await setupFarmerAccount();
    if (result.success) {
      setSetupMessage('Farmer account setup completed! You can now try logging in.');
    } else {
      setSetupMessage(`Setup failed: ${result.error}`);
    }
  };

  const handleCheckAccount = async () => {
    const result = await checkFarmerAccount();
    if (result.exists) {
      setSetupMessage('Farmer account exists and is ready for login.');
    } else {
      setSetupMessage('Farmer account not found. Please run setup.');
    }
  };

  const handleTestLogin = async () => {
    setSetupMessage('Testing farmer login...');
    const result = await testFarmerLogin();
    if (result.success) {
      setSetupMessage('Login test successful! You can now try logging in.');
    } else {
      setSetupMessage(`Login test failed: ${result.error}`);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { email, password });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Auth response:', { data, error });

      if (error) {
        console.error('Auth error:', error);
        setError(error.message);
      } else if (data.user) {
        console.log('User authenticated:', data.user);
        
        // Check if user is a farmer
        const { data: profile, error: profileError } = await supabase
          .from('farmer_profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        console.log('Profile check:', { profile, profileError });

        if (profile) {
          console.log('Farmer profile found, navigating to dashboard');
          navigate('/farmer/dashboard');
        } else {
          console.log('No farmer profile found');
          setError('Access denied. This portal is for farmers only.');
          await supabase.auth.signOut();
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">FarmFresh</h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Farmer Portal</h2>
          <p className="text-gray-600 mt-2">Sign in to manage your farm operations</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Farmer Login</CardTitle>
            <CardDescription>
              Access your farm management dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Setup Buttons for Testing */}
            <div className="mt-6 space-y-3">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCheckAccount}
                  className="flex-1"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Check Account
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSetupAccount}
                  className="flex-1"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Setup Account
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleTestLogin}
                  className="flex-1"
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Login
                </Button>
              </div>
              
              {setupMessage && (
                <Alert>
                  <AlertDescription>{setupMessage}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Back to Landing */}
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-sm text-blue-600 hover:text-blue-700 underline"
              >
                ← Back to Portal Selection
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 FarmFresh. Secure farmer access only.</p>
        </div>
      </div>
    </div>
  );
};

export default FarmerLogin; 