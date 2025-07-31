import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate('/');
  };

  const handleFarmerClick = () => {
    navigate('/farmer/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800">FarmFresh</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting farmers directly to customers for fresh, organic produce
          </p>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> The customer portal is now the default landing page. 
              You can access it directly from the main website.
            </p>
          </div>
        </div>

        {/* Portal Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Customer Portal */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <ShoppingBag className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Customer Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Browse fresh products, place orders, and track deliveries
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• Browse fresh farm products</li>
                <li>• Add items to cart & wishlist</li>
                <li>• Place orders securely</li>
                <li>• Track order status</li>
                <li>• Real-time delivery updates</li>
              </ul>
              <Button 
                onClick={handleCustomerClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white group-hover:bg-green-700 transition-colors"
                size="lg"
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Main Website
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Farmer Portal */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Farmer Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Manage orders, add products, and update delivery status
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• View incoming orders</li>
                <li>• Update delivery status</li>
                <li>• Add new products</li>
                <li>• Manage inventory</li>
                <li>• Track sales & analytics</li>
              </ul>
              <Button 
                onClick={handleFarmerClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-700 transition-colors"
                size="lg"
              >
                Enter Farmer Portal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>© 2024 FarmFresh. Connecting farmers and customers for fresh produce.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 