import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Loading } from '../components/ui/Loading';
import { toast } from '../components/ui/Toast';
import { logInfo } from '../../logging-middleware/logger';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'electronics', 'clothing', 'books', 'home'];

  const fetchProducts = async () => {
    setLoading(true);
    logInfo('Products', 'Fetching products data');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
          category: 'electronics',
          inStock: true,
        },
        {
          id: '2',
          name: 'Cotton T-Shirt',
          description: 'Comfortable 100% cotton t-shirt in multiple colors',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
          category: 'clothing',
          inStock: true,
        },
        {
          id: '3',
          name: 'JavaScript Handbook',
          description: 'Complete guide to modern JavaScript development',
          price: 39.99,
          image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop',
          category: 'books',
          inStock: false,
        },
        {
          id: '4',
          name: 'Smart Watch',
          description: 'Feature-rich smartwatch with health monitoring',
          price: 299.99,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
          category: 'electronics',
          inStock: true,
        },
        {
          id: '5',
          name: 'Coffee Maker',
          description: 'Premium coffee maker for the perfect brew',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1520970014086-2208d157c9e2?w=300&h=300&fit=crop',
          category: 'home',
          inStock: true,
        },
        {
          id: '6',
          name: 'Running Shoes',
          description: 'Lightweight running shoes for optimal performance',
          price: 129.99,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
          category: 'clothing',
          inStock: true,
        },
      ];
      
      setProducts(mockProducts);
      logInfo('Products', `Loaded ${mockProducts.length} products`);
      toast.success('Products loaded successfully');
    } catch (error) {
      logInfo('Products', 'Failed to fetch products');
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (productId: string) => {
    logInfo('Products', `Added product ${productId} to cart`);
    toast.success('Product added to cart!');
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            Browse our collection of products across different categories.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={fetchProducts} loading={loading}>
            {products.length === 0 ? 'Load Products' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      {products.length > 0 && (
        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="mt-8">
          <Loading size="lg" text="Loading products..." className="min-h-96 flex items-center justify-center" />
        </div>
      ) : products.length === 0 ? (
        <div className="mt-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by loading some products.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {product.description}
                    </CardDescription>
                  </div>
                  <span className="text-lg font-bold text-primary-600">
                    ${product.price}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 capitalize">
                    {product.category}
                  </span>
                  <Button
                    size="sm"
                    disabled={!product.inStock}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && products.length > 0 && (
        <div className="mt-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products in this category</h3>
          <p className="mt-1 text-sm text-gray-500">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
};
