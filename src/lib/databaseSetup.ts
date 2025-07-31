import { supabase } from "@/integrations/supabase/client";

export const databaseSetup = {
  // Check if tables exist and create them if they don't
  async checkAndCreateTables(): Promise<boolean> {
    try {
      console.log('Checking database tables...');
      
      // Check if cart_items table exists
      const { data: cartData, error: cartError } = await supabase
        .rpc('get_table_info', { table_name: 'cart_items' });
      
      // Check if wishlist_items table exists
      const { data: wishlistData, error: wishlistError } = await supabase
        .rpc('get_table_info', { table_name: 'wishlist_items' });

      let tablesCreated = true;

      // Create cart_items table if it doesn't exist
      if (!cartData || cartData.length === 0 || cartError) {
        console.log('cart_items table does not exist. Creating table...');
        const { error: createCartError } = await supabase
          .rpc('create_cart_items_table');
        
        if (createCartError) {
          console.error('Failed to create cart_items table:', createCartError);
          tablesCreated = false;
        }
      }
      
      // Create wishlist_items table if it doesn't exist
      if (!wishlistData || wishlistData.length === 0 || wishlistError) {
        console.log('wishlist_items table does not exist. Creating table...');
        const { error: createWishlistError } = await supabase
          .rpc('create_wishlist_items_table');
        
        if (createWishlistError) {
          console.error('Failed to create wishlist_items table:', createWishlistError);
          tablesCreated = false;
        }
      }

      if (tablesCreated) {
        console.log('Database tables exist and are accessible.');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking database tables:', error);
      return false;
    }
  },

  // Test database connection
  async testConnection(): Promise<boolean> {
    try {
      console.log('Testing database connection...');
      const { data, error } = await supabase
        .from('cart_items')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('Database connection test failed:', error);
        return false;
      }
      
      console.log('Database connection successful.');
      return true;
    } catch (error) {
      console.error('Database connection test error:', error);
      return false;
    }
  },

  // Get table information
  async getTableInfo(): Promise<void> {
    try {
      console.log('Getting table information...');
      
      // Check cart_items table
      const { data: cartData, error: cartError } = await supabase
        .from('cart_items')
        .select('*')
        .limit(1);
      
      if (cartError) {
        console.error('Error accessing cart_items table:', cartError);
      } else {
        console.log('cart_items table is accessible');
      }

      // Check wishlist_items table
      const { data: wishlistData, error: wishlistError } = await supabase
        .from('wishlist_items')
        .select('*')
        .limit(1);
      
      if (wishlistError) {
        console.error('Error accessing wishlist_items table:', wishlistError);
      } else {
        console.log('wishlist_items table is accessible');
      }
    } catch (error) {
      console.error('Error getting table information:', error);
    }
  },

  // Test inserting a sample item
  async testInsert(): Promise<boolean> {
    try {
      console.log('Testing insert functionality...');
      
      const testItem = {
        user_id: 'test-user-id',
        product_id: 'test-product',
        name: 'Test Product',
        price: 100,
        image: 'test-image.jpg',
        category: 'test',
        description: 'Test description',
        quantity: 1,
        is_organic: false,
        in_stock: true
      };

      console.log('Attempting to insert test item:', testItem);

      const { data, error } = await supabase
        .from('cart_items')
        .insert([testItem])
        .select();
      
      if (error) {
        console.error('Insert test failed:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        console.error('Error hint:', error.hint);
        return false;
      }
      
      console.log('Insert test successful. Data returned:', data);
      
      // Clean up test data
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('product_id', 'test-product');
      
      if (deleteError) {
        console.error('Cleanup failed:', deleteError);
      } else {
        console.log('Test data cleaned up successfully');
      }
      
      return true;
    } catch (error) {
      console.error('Insert test error:', error);
      return false;
    }
  }
};