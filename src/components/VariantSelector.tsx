import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductVariant } from '@/lib/productsData';

interface VariantSelectorProps {
  productName: string;
  variants: ProductVariant[];
  onSelect: (variant: ProductVariant) => void;
  onClose: () => void;
  action: 'cart' | 'wishlist';
  productType?: 'rice' | 'dhoopbatti' | 'other';
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  productName,
  variants,
  onSelect,
  onClose,
  action,
  productType = 'other'
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const handleConfirm = () => {
    if (selectedVariant) {
      onSelect(selectedVariant);
      onClose();
    }
  };

  const getProductTypeConfig = () => {
    switch (productType) {
      case 'rice':
        return {
          title: 'Rice Variety',
          description: 'Choose your preferred rice variety to add to',
          priceUnit: '/kg',
          dropdownText: 'grain length'
        };
      case 'dhoopbatti':
        return {
          title: 'Incense Fragrance',
          description: 'Choose your preferred incense fragrance to add to',
          priceUnit: '/pack',
          dropdownText: 'fragrance'
        };
      default:
        return {
          title: 'Product Variety',
          description: 'Choose your preferred variety to add to',
          priceUnit: '',
          dropdownText: 'variety'
        };
    }
  };

  const config = getProductTypeConfig();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-lg">Select {productName} {config.title}</CardTitle>
          <CardDescription>
            {config.description} {action === 'cart' ? 'cart' : 'wishlist'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Variants Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{config.title}</label>
            <div className="relative">
              <select
                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => {
                  const variant = variants.find(v => v.id === e.target.value);
                  setSelectedVariant(variant || null);
                }}
                value={selectedVariant?.id || ''}
              >
                <option value="">Select a {config.dropdownText}...</option>
                {variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name} - ₹{variant.price}{config.priceUnit}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Selected Variant Details */}
          {selectedVariant && (
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{selectedVariant.name}</span>
                <span className="text-lg font-bold text-green-600">₹{selectedVariant.price}{config.priceUnit}</span>
              </div>
              <p className="text-sm text-gray-600">{selectedVariant.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedVariant}
              className="flex-1"
            >
              {action === 'cart' ? 'Add to Cart' : 'Add to Wishlist'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 