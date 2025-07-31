import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../NavBar';
import { mockSupabase, mockUser } from '../../test/mocks/supabase';

// Mock the hooks and services
jest.mock('@/hooks/useCart', () => ({
  useCart: () => ({
    cart: [
      { id: '1', name: 'Test Product', quantity: 2 },
      { id: '2', name: 'Another Product', quantity: 1 },
    ],
  }),
}));

jest.mock('@/hooks/useWishlist', () => ({
  useWishlist: () => ({
    wishlist: [
      { id: '1', name: 'Wishlist Product' },
    ],
  }),
}));

jest.mock('@/lib/useSupabaseUser', () => ({
  useSupabaseUser: () => ({
    user: mockUser,
    loading: false,
  }),
}));

jest.mock('@/integrations/supabase/client', () => ({
  supabase: mockSupabase,
}));

const renderNavBar = (props = {}) => {
  return render(
    <BrowserRouter>
      <NavBar {...props} />
    </BrowserRouter>
  );
};

describe('NavBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop Navigation', () => {
    it('renders desktop navigation elements', () => {
      renderNavBar();
      
      // Check for logo and brand
      expect(screen.getByText('FarmFresh')).toBeInTheDocument();
      expect(screen.getByText('N')).toBeInTheDocument();
      
      // Check for navigation links
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
      
      // Check for right side elements
      expect(screen.getByText('Wishlist')).toBeInTheDocument();
      expect(screen.getByText('Orders')).toBeInTheDocument();
      expect(screen.getByText('Cart')).toBeInTheDocument();
    });

    it('displays cart count badge', () => {
      renderNavBar();
      
      const cartBadge = screen.getByText('3'); // 2 + 1 quantities
      expect(cartBadge).toBeInTheDocument();
      expect(cartBadge).toHaveClass('bg-leaf-green');
    });

    it('displays wishlist count badge', () => {
      renderNavBar();
      
      const wishlistBadge = screen.getByText('1');
      expect(wishlistBadge).toBeInTheDocument();
      expect(wishlistBadge).toHaveClass('bg-leaf-green');
    });

    it('handles navigation link clicks', async () => {
      const mockScrollIntoView = jest.fn();
      Element.prototype.scrollIntoView = mockScrollIntoView;
      
      renderNavBar();
      
      const productsLink = screen.getByText('Products');
      fireEvent.click(productsLink);
      
      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
      });
    });

    it('opens user menu when user is logged in', async () => {
      renderNavBar();
      
      const userButton = screen.getByLabelText('User menu');
      fireEvent.click(userButton);
      
      await waitFor(() => {
        expect(screen.getByText('My Profile')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
      });
    });

    it('shows login link when user is not logged in', () => {
      jest.mocked(require('@/lib/useSupabaseUser').useSupabaseUser).mockReturnValue({
        user: null,
        loading: false,
      });
      
      renderNavBar();
      
      expect(screen.getByText('Login')).toBeInTheDocument();
    });
  });

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      // Mock window.innerWidth for mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768, // Below md breakpoint
      });
    });

    it('renders mobile navigation elements', () => {
      renderNavBar();
      
      // Check for mobile logo
      expect(screen.getByText('FarmFresh')).toBeInTheDocument();
      
      // Check for mobile menu toggle
      expect(screen.getByLabelText('Toggle mobile menu')).toBeInTheDocument();
    });

    it('toggles mobile menu when hamburger button is clicked', async () => {
      renderNavBar();
      
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      fireEvent.click(menuButton);
      
      await waitFor(() => {
        expect(screen.getByText('Products')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
      });
    });

    it('closes mobile menu when navigation link is clicked', async () => {
      renderNavBar();
      
      const menuButton = screen.getByLabelText('Toggle mobile menu');
      fireEvent.click(menuButton);
      
      const productsLink = screen.getByText('Products');
      fireEvent.click(productsLink);
      
      await waitFor(() => {
        expect(screen.queryByText('About')).not.toBeInTheDocument();
      });
    });
  });

  describe('Profile Modal', () => {
    it('opens profile modal when "My Profile" is clicked', async () => {
      renderNavBar();
      
      const userButton = screen.getByLabelText('User menu');
      fireEvent.click(userButton);
      
      const profileButton = screen.getByText('My Profile');
      fireEvent.click(profileButton);
      
      await waitFor(() => {
        expect(screen.getByText('Edit Profile')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
      });
    });

    it('allows updating profile name', async () => {
      renderNavBar();
      
      // Open profile modal
      const userButton = screen.getByLabelText('User menu');
      fireEvent.click(userButton);
      
      const profileButton = screen.getByText('My Profile');
      fireEvent.click(profileButton);
      
      const nameInput = screen.getByPlaceholderText('Name');
      await userEvent.type(nameInput, 'New Name');
      
      expect(nameInput).toHaveValue('New Name');
    });

    it('handles password visibility toggle', async () => {
      renderNavBar();
      
      // Open profile modal
      const userButton = screen.getByLabelText('User menu');
      fireEvent.click(userButton);
      
      const profileButton = screen.getByText('My Profile');
      fireEvent.click(profileButton);
      
      const currentPasswordInput = screen.getByPlaceholderText('Current Password');
      const toggleButton = currentPasswordInput.parentElement?.querySelector('button');
      
      fireEvent.click(toggleButton!);
      
      await waitFor(() => {
        expect(currentPasswordInput).toHaveAttribute('type', 'text');
      });
    });

    it('closes profile modal when close button is clicked', async () => {
      renderNavBar();
      
      // Open profile modal
      const userButton = screen.getByLabelText('User menu');
      fireEvent.click(userButton);
      
      const profileButton = screen.getByText('My Profile');
      fireEvent.click(profileButton);
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
      });
    });
  });

  describe('Authentication', () => {
    it('handles logout correctly', async () => {
      renderNavBar();
      
      const userButton = screen.getByLabelText('User menu');
      fireEvent.click(userButton);
      
      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);
      
      await waitFor(() => {
        expect(mockSupabase.auth.signOut).toHaveBeenCalled();
      });
    });

    it('loads user data on mount', async () => {
      renderNavBar();
      
      await waitFor(() => {
        expect(mockSupabase.auth.getUser).toHaveBeenCalled();
      });
    });
  });

  describe('Responsive Design', () => {
    it('applies correct responsive classes', () => {
      renderNavBar();
      
      // Check for responsive classes
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('bg-white', 'shadow', 'sticky', 'top-0', 'z-50');
    });

    it('handles cart click callback', async () => {
      const mockOnCartClick = jest.fn();
      renderNavBar({ onCartClick: mockOnCartClick });
      
      const cartButton = screen.getByText('Cart');
      fireEvent.click(cartButton);
      
      expect(mockOnCartClick).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      renderNavBar();
      
      expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
      expect(screen.getByLabelText('User menu')).toBeInTheDocument();
      expect(screen.getByLabelText('Toggle mobile menu')).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      renderNavBar();
      
      const productsLink = screen.getByText('Products');
      productsLink.focus();
      
      expect(productsLink).toHaveFocus();
    });
  });
}); 