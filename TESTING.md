# Testing Guide for T-ER Project

This document provides instructions for running the test suite for the T-ER project, which includes both frontend and backend tests.

## Running All Tests

You can run both frontend and backend tests with a single command:

```bash
npm run test:all
```

This command will:
1. Run all frontend tests using Jest
2. Install necessary Python dependencies from `requirements.txt`
3. Run all backend tests using pytest

## Frontend Tests

The frontend tests are written using Jest and React Testing Library. They test the React components, hooks, and service functions related to the cart and wishlist functionality.

### Running Frontend Tests

To run the frontend tests, navigate to the project root directory and run:

```bash
npm test
```

This will run all the tests in the `src/__tests__` directory.

To run tests in watch mode (which will rerun tests when files change):

```bash
npm run test:watch
```

To generate a coverage report:

```bash
npm run test:coverage
```

### Frontend Test Structure

The frontend tests are organized as follows:

- `src/__tests__/components/`: Tests for React components
  - `ProductsSection.test.tsx`: Tests for the ProductsSection component, which handles displaying products and adding them to cart/wishlist

- `src/__tests__/hooks/`: Tests for React hooks
  - `useCart.test.tsx`: Tests for the useCart hook, which manages cart state and operations
  - `useWishlist.test.tsx`: Tests for the useWishlist hook, which manages wishlist state and operations

- `src/__tests__/lib/`: Tests for service functions
  - `cartService.test.ts`: Tests for cart service functions that interact with the database
  - `wishlistService.test.ts`: Tests for wishlist service functions that interact with the database
  - `databaseSetup.test.ts`: Tests for database setup and initialization functions

## Backend Tests

The backend tests are written using pytest and Django's testing utilities. They test the API endpoints for cart and wishlist functionality.

### Running Backend Tests

To run the backend tests, navigate to the backend directory and run:

```bash
pytest
```

To run tests with coverage report:

```bash
pytest --cov=.
```

To run a specific test file:

```bash
pytest tests/test_cart_api.py
```

### Backend Test Structure

The backend tests are organized as follows:

- `backend/tests/test_cart_api.py`: Tests for cart API endpoints
- `backend/tests/test_wishlist_api.py`: Tests for wishlist API endpoints

## Test Coverage

The tests cover the following functionality:

### Frontend

1. **Cart Service**:
   - Getting cart items from the database
   - Adding items to the cart
   - Removing items from the cart
   - Updating item quantities
   - Clearing the cart

2. **Wishlist Service**:
   - Getting wishlist items from the database
   - Adding items to the wishlist
   - Removing items from the wishlist

3. **Database Setup**:
   - Checking if tables exist
   - Creating tables if they don't exist
   - Testing database connection
   - Testing insert and delete operations

4. **useCart Hook**:
   - Loading cart items when user is authenticated
   - Adding items to the cart
   - Removing items from the cart
   - Updating item quantities
   - Clearing the cart
   - Handling loading states

5. **useWishlist Hook**:
   - Loading wishlist items when user is authenticated
   - Adding items to the wishlist
   - Removing items from the wishlist
   - Handling loading states
   - Handling errors

6. **ProductsSection Component**:
   - Rendering products
   - Adding products to cart and wishlist
   - Authentication checks before adding to cart/wishlist
   - Filtering products by category, search term, and organic status
   - Database check functionality
   - Test cart functionality
   - Handling loading and error states

### Backend

1. **Cart API**:
   - Getting cart items when authenticated/unauthenticated
   - Adding items to the cart
   - Updating item quantities
   - Removing items from the cart
   - Clearing the cart
   - Handling duplicate items (increasing quantity)
   - Removing items when quantity is set to zero

2. **Wishlist API**:
   - Getting wishlist items when authenticated/unauthenticated
   - Adding items to the wishlist
   - Handling duplicate items (preventing duplicates)
   - Removing items from the wishlist
   - Clearing the wishlist
   - Moving items from wishlist to cart

## Edge Cases Covered

- Authentication state: Tests handle both authenticated and unauthenticated states
- Error handling: Tests cover error scenarios in API calls and database operations
- Empty states: Tests verify correct behavior when cart/wishlist is empty
- Duplicate items: Tests ensure cart increases quantity for existing items and wishlist prevents duplicates
- Zero quantity: Tests verify that setting quantity to zero removes the item from cart
- Loading states: Tests check that loading states are correctly managed

## Suggested Improvements

1. **Backend Tests**:
   - The backend tests are currently skeleton tests with placeholders. Once the actual API endpoints are implemented, these tests should be updated with real assertions.
   - Add integration tests that test the interaction between different API endpoints.

2. **Frontend Tests**:
   - Add more comprehensive tests for error handling scenarios.
   - Add tests for the UI components that display cart and wishlist items.
   - Add end-to-end tests using Cypress to test the complete user flow.

3. **General**:
   - Set up continuous integration to run tests automatically on code changes.
   - Implement snapshot testing for UI components to detect unintended changes.
   - Add performance tests for database operations with large datasets.