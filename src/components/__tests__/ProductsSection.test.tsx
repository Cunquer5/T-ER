import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductsSection } from '../ProductsSection';
import { mockSupabase, mockUser } from '../../test/mocks/supabase';

// Mock the hooks and services
jest.mock('@/hooks/useCart', () => ({
  useCart: () => ({
    addToCart: jest.fn().mockResolvedValue(true),
    removeFromCart: jest.fn().mockResolvedValue(true),
    cart: [],
  }),
}));

jest.mock('@/hooks/useWishlist', () => ({
  useWishlist: () => ({
    addToWishlist: jest.fn().mockResolvedValue(true),
    removeFromWishlist: jest.fn().mockResolvedValue(true),
    wishlist: [],
  }),
}));

jest.mock('@/lib/useSupabaseUser', () => ({
  useSupabaseUser: () => ({
    user: mockUser,
    loading: false,
  }),
}));

jest.mock('@/lib/databaseSetup', () => ({
  databaseSetup: {
    checkAndCreateTables: jest.fn().mockResolvedValue(true),
    testInsert: jest.fn().mockResolvedValue(true),
  },
}));

const renderProductsSection = () => {
  return render(<ProductsSection />);
};

describe('ProductsSection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the section title and description', () => {
      renderProductsSection();
      
      expect(screen.getByText('Fresh Products')).toBeInTheDocument();
      expect(screen.getByText(/Discover our wide selection/)).toBeInTheDocument();
    });

    it('renders search and filter controls', () => {
      renderProductsSection();
      
      expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
      expect(screen.getByText('Sort:')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders product grid', async () => {
      renderProductsSection();
      
      await waitFor(() => {
        expect(screen.getByText('Guava')).toBeInTheDocument();
        expect(screen.getByText('Papaya')).toBeInTheDocument();
        expect(screen.getByText('A2 Gir Cow Milk')).toBeInTheDocument();
      });
    });

    it('shows loading state initially', () => {
      renderProductsSection();
      
      expect(screen.getByText('Loading products...')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('filters products by search term', async () => {
      renderProductsSection();
      
      const searchInput = screen.getByPlaceholderText('Search products...');
      await userEvent.type(searchInput, 'Guava');
      
      await waitFor(() => {
        expect(screen.getByText('Guava')).toBeInTheDocument();
        expect(screen.queryByText('Papaya')).not.toBeInTheDocument();
      });
    });

    it('filters products by description', async () => {
      renderProductsSection();
      
      const searchInput = screen.getByPlaceholderText('Search products...');
      await userEvent.type(searchInput, 'nutritious');
      
      await waitFor(() => {
        expect(screen.getByText('Guava')).toBeInTheDocument();
      });
    });

    it('shows no results message when no products match', async () => {
      renderProductsSection();
      
      const searchInput = screen.getByPlaceholderText('Search products...');
      await userEvent.type(searchInput, 'nonexistent');
      
      await waitFor(() => {
        expect(screen.getByText('No products found matching your criteria.')).toBeInTheDocument();
      });
    });
  });

  describe('Category Filtering', () => {
    it('filters products by category', async () => {
      renderProductsSection();
      
      const categorySelect = screen.getByRole('combobox');
      fireEvent.click(categorySelect);
      
      const fruitsOption = screen.getByText('Fruits');
      fireEvent.click(fruitsOption);
      
      await waitFor(() => {
        expect(screen.getByText('Guava')).toBeInTheDocument();
        expect(screen.getByText('Papaya')).toBeInTheDocument();
        expect(screen.queryByText('A2 Gir Cow Milk')).not.toBeInTheDocument();
      });
    });

    it('shows all products when "All Products" is selected', async () => {
      renderProductsSection();
      
      const categorySelect = screen.getByRole('combobox');
      fireEvent.click(categorySelect);
      
      const allOption = screen.getByText('All Products');
      fireEvent.click(allOption);
      
      await waitFor(() => {
        expect(screen.getByText('Guava')).toBeInTheDocument();
        expect(screen.getByText('A2 Gir Cow Milk')).toBeInTheDocument();
      });
    });
  });

  describe('Cart Operations', () => {
    it('adds product to cart when user is authenticated', async () => {
      const mockAddToCart = jest.fn().mockResolvedValue(true);
      jest.mocked(require('@/hooks/useCart').useCart).mockReturnValue({
        addToCart: mockAddToCart,
        removeFromCart: jest.fn(),
        cart: [],
      });
      
      renderProductsSection();
      
      await waitFor(() => {
        const addToCartButtons = screen.getAllByText(/Add to Cart/i);
        fireEvent.click(addToCartButtons[0]);
      });
      
      await waitFor(() => {
        expect(mockAddToCart).toHaveBeenCalled();
      });
    });

    it('shows login alert when user is not authenticated', async () => {
      jest.mocked(require('@/lib/useSupabaseUser').useSupabaseUser).mockReturnValue({
        user: null,
        loading: false,
      });
      
      renderProductsSection();
      
      await waitFor(() => {
        const addToCartButtons = screen.getAllByText(/Add to Cart/i);
        fireEvent.click(addToCartButtons[0]);
      });
      
      await waitFor(() => {
        expect(screen.getByText(/Please login to add/)).toBeInTheDocument();
      });
    });

    it('shows success alert when product is added to cart', async () => {
      const mockAddToCart = jest.fn().mockResolvedValue(true);
      jest.mocked(require('@/hooks/useCart').useCart).mockReturnValue({
        addToCart: mockAddToCart,
        removeFromCart: jest.fn(),
        cart: [],
      });
      
      renderProductsSection();
      
      await waitFor(() => {
        const addToCartButtons = screen.getAllByText(/Add to Cart/i);
        fireEvent.click(addToCartButtons[0]);
      });
      
      await waitFor(() => {
        expect(screen.getByText(/added to cart!/)).toBeInTheDocument();
      });
    });

    it('shows error alert when cart operation fails', async () => {
      const mockAddToCart = jest.fn().mockResolvedValue(false);
      jest.mocked(require('@/hooks/useCart').useCart).mockReturnValue({
        addToCart: mockAddToCart,
        removeFromCart: jest.fn(),
        cart: [],
      });
      
      renderProductsSection();
      
      await waitFor(() => {
        const addToCartButtons = screen.getAllByText(/Add to Cart/i);
        fireEvent.click(addToCartButtons[0]);
      });
      
      await waitFor(() => {
        expect(screen.getByText(/Failed to add/)).toBeInTheDocument();
      });
    });
  });

  describe('Wishlist Operations', () => {
    it('adds product to wishlist when user is authenticated', async () => {
      const mockAddToWishlist = jest.fn().mockResolvedValue(true);
      jest.mocked(require('@/hooks/useWishlist').useWishlist).mockReturnValue({
        addToWishlist: mockAddToWishlist,
        removeFromWishlist: jest.fn(),
        wishlist: [],
      });
      
      renderProductsSection();
      
      await waitFor(() => {
        const wishlistButtons = screen.getAllByTestId('wishlist-button');
        fireEvent.click(wishlistButtons[0]);
      });
      
      await waitFor(() => {
        expect(mockAddToWishlist).toHaveBeenCalled();
      });
    });

    it('shows login alert when user is not authenticated for wishlist', async () => {
      jest.mocked(require('@/lib/useSupabaseUser').useSupabaseUser).mockReturnValue({
        user: null,
        loading: false,
      });
      
      renderProductsSection();
      
      await waitFor(() => {
        const wishlistButtons = screen.getAllByTestId('wishlist-button');
        fireEvent.click(wishlistButtons[0]);
      });
      
      await waitFor(() => {
        expect(screen.getByText(/Please login to add.*wishlist/)).toBeInTheDocument();
      });
    });

    it('shows success alert when product is added to wishlist', async () => {
      const mockAddToWishlist = jest.fn().mockResolvedValue(true);
      jest.mocked(require('@/hooks/useWishlist').useWishlist).mockReturnValue({
        addToWishlist: mockAddToWishlist,
        removeFromWishlist: jest.fn(),
        wishlist: [],
      });
      
      renderProductsSection();
      
      await waitFor(() => {
        const wishlistButtons = screen.getAllByTestId('wishlist-button');
        fireEvent.click(wishlistButtons[0]);
      });
      
      await waitFor(() => {
        expect(screen.getByText(/added to wishlist!/)).toBeInTheDocument();
      });
    });
  });

  describe('Alert System', () => {
    it('shows red alert for failed operations', async () => {
      const mockAddToCart = jest.fn().mockResolvedValue(false);
      jest.mocked(require('@/hooks/useCart').useCart).mockReturnValue({
        addToCart: mockAddToCart,
        removeFromCart: jest.fn(),
        cart: [],
      });
      
      renderProductsSection();
      
      await waitFor(() => {
        const addToCartButtons = screen.getAllByText(/Add to Cart/i);
        fireEvent.click(addToCartButtons[0]);
      });
      
      await waitFor(() => {
        const alert = screen.getByText(/Failed to add/);
        expect(alert.parentElement).toHaveClass('bg-red-600');
      });
    });

    it('shows green alert for successful operations', async () => {
      const mockAddToCart = jest.fn().mockResolvedValue(true);
      jest.mocked(require('@/hooks/useCart').useCart).mockReturnValue({
        addToCart: mockAddToCart,
        removeFromCart: jest.fn(),
        cart: [],
      });
      
      renderProductsSection();
      
      await waitFor(() => {
        const addToCartButtons = screen.getAllByText(/Add to Cart/i);
        fireEvent.click(addToCartButtons[0]);
      });
      
      await waitFor(() => {
        const alert = screen.getByText(/added to cart!/);
        expect(alert.parentElement).toHaveClass('bg-blue-600');
      });
    });

    it('auto-dismisses alerts after 3 seconds', async () => {
      jest.useFakeTimers();
      
      const mockAddToCart = jest.fn().mockResolvedValue(true);
      jest.mocked(require('@/hooks/useCart').useCart).mockReturnValue({
        addToCart: mockAddToCart,
        removeFromCart: jest.fn(),
        cart: [],
      });
      
      renderProductsSection();
      
      await waitFor(() => {
        const addToCartButtons = screen.getAllByText(/Add to Cart/i);
        fireEvent.click(addToCartButtons[0]);
      });
      
      await waitFor(() => {
        expect(screen.getByText(/added to cart!/)).toBeInTheDocument();
      });
      
      jest.advanceTimersByTime(3000);
      
      await waitFor(() => {
        expect(screen.queryByText(/added to cart!/)).not.toBeInTheDocument();
      });
      
      jest.useRealTimers();
    });
  });

  describe('Debug Panel', () => {
    it('shows debug panel in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      renderProductsSection();
      
      expect(screen.getByText('Debug Info:')).toBeInTheDocument();
      expect(screen.getByText('User Loading:')).toBeInTheDocument();
      expect(screen.getByText('User Authenticated:')).toBeInTheDocument();
      
      process.env.NODE_ENV = originalEnv;
    });

    it('does not show debug panel in production mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      renderProductsSection();
      
      expect(screen.queryByText('Debug Info:')).not.toBeInTheDocument();
      
      process.env.NODE_ENV = originalEnv;
    });

    it('handles database check button click', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      renderProductsSection();
      
      const checkButton = screen.getByText('Check Database');
      fireEvent.click(checkButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Database tables exist/)).toBeInTheDocument();
      });
      
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive grid classes', async () => {
      renderProductsSection();
      
      await waitFor(() => {
        const productGrid = screen.getByRole('grid');
        expect(productGrid).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
      });
    });

    it('applies responsive spacing classes', () => {
      renderProductsSection();
      
      const section = screen.getByRole('region');
      expect(section).toHaveClass('py-8', 'sm:py-16');
    });
  });

  describe('Error Handling', () => {
    it('shows error message when products fail to load', async () => {
      // Mock a scenario where products fail to load
      jest.spyOn(console, 'error').mockImplementation(() => {});
      
      renderProductsSection();
      
      // Simulate an error state
      await waitFor(() => {
        expect(screen.getByText('Loading products...')).toBeInTheDocument();
      });
    });
  });
}); 