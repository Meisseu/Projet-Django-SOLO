import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { FaFilter, FaSearch, FaSort, FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';
import { apiService } from '../services/api';
import { useApp } from '../context/AppContext';

const CatalogContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const CatalogHeader = styled.div`
  background: var(--bg-secondary);
  padding: var(--spacing-xl) 0;
  border-bottom: 2px solid var(--neon-green);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: var(--spacing-lg);
`;

const SearchBar = styled.div`
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-card);
  border: 2px solid var(--border-primary);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: 1.1rem;
  transition: all var(--transition-normal);

  &:focus {
    outline: none;
    border-color: var(--neon-green);
    box-shadow: var(--shadow-neon);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--neon-green);
  font-size: 1.2rem;
`;

const FiltersSection = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
`;

const FilterGroup = styled.div`
  h3 {
    color: var(--neon-green);
    margin-bottom: var(--spacing-sm);
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: var(--spacing-sm);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-primary);
`;

const FilterInput = styled.input`
  width: 100%;
  padding: var(--spacing-sm);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-primary);
`;

const ClearFiltersButton = styled.button`
  background: transparent;
  border: 2px solid var(--neon-purple);
  color: var(--neon-purple);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: var(--neon-purple);
    color: var(--bg-primary);
    box-shadow: var(--shadow-neon-purple);
  }
`;

const ProductsSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  gap: var(--spacing-md);
`;

const ResultsCount = styled.div`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const SortSelect = styled.select`
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-primary);
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`;

const ProductCard = styled(motion.div)`
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
  position: relative;

  &:hover {
    border-color: var(--neon-green);
    box-shadow: var(--shadow-neon);
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  height: 250px;
  background: linear-gradient(45deg, var(--bg-tertiary), var(--bg-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  opacity: 0;
  transition: all var(--transition-normal);

  ${ProductCard}:hover & {
    opacity: 1;
  }
`;

const OverlayButton = styled.button`
  background: var(--neon-green);
  color: var(--bg-primary);
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--neon-yellow);
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: var(--spacing-lg);
`;

const ProductName = styled.h3`
  color: var(--neon-yellow);
  margin-bottom: var(--spacing-sm);
  font-size: 1.2rem;
`;

const ProductDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-md);
  line-height: 1.4;
`;

const ProductPrice = styled.div`
  color: var(--neon-green);
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  color: var(--neon-yellow);
`;

const ProductStock = styled.div`
  color: ${props => props.inStock ? 'var(--neon-green)' : 'var(--neon-purple)'};
  font-size: 0.9rem;
  margin-bottom: var(--spacing-md);
  font-weight: 600;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xl);
`;

const PageButton = styled.button`
  background: ${props => props.active ? 'var(--neon-green)' : 'transparent'};
  color: ${props => props.active ? 'var(--bg-primary)' : 'var(--neon-green)'};
  border: 2px solid var(--neon-green);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: 600;

  &:hover {
    background: var(--neon-green);
    color: var(--bg-primary);
    box-shadow: var(--shadow-neon);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useApp();

  // Filter states
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    category: '',
    min_price: '',
    max_price: '',
    in_stock: false,
    featured: false,
    ordering: '-created_at'
  });

  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    count: 0
  });

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, [searchParams]);

  const loadCategories = async () => {
    try {
      const response = await apiService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.current,
        ...filters
      };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === false) {
          delete params[key];
        }
      });

      const response = await apiService.getProducts(params);
      setProducts(response.data.results || response.data);
      
      if (response.data.count !== undefined) {
        setPagination(prev => ({
          ...prev,
          total: Math.ceil(response.data.count / 12),
          count: response.data.count
        }));
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const newParams = new URLSearchParams();
    Object.keys(newFilters).forEach(filterKey => {
      if (newFilters[filterKey] && newFilters[filterKey] !== '') {
        newParams.set(filterKey, newFilters[filterKey]);
      }
    });
    setSearchParams(newParams);
    
    // Reset to first page
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleFilterChange('search', e.target.value);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      min_price: '',
      max_price: '',
      in_stock: false,
      featured: false,
      ordering: '-created_at'
    });
    setSearchParams({});
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      // Show success message or notification
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <CatalogContainer>
      <CatalogHeader>
        <HeaderContent>
          <PageTitle>Catalogue Cyberpunk</PageTitle>
          
          <SearchBar>
            <form onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Rechercher des produits..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
              <SearchIcon />
            </form>
          </SearchBar>

          <FiltersSection>
            <FiltersGrid>
              <FilterGroup>
                <h3>Catégorie</h3>
                <FilterSelect
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">Toutes les catégories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </FilterSelect>
              </FilterGroup>

              <FilterGroup>
                <h3>Prix minimum</h3>
                <FilterInput
                  type="number"
                  placeholder="0"
                  value={filters.min_price}
                  onChange={(e) => handleFilterChange('min_price', e.target.value)}
                />
              </FilterGroup>

              <FilterGroup>
                <h3>Prix maximum</h3>
                <FilterInput
                  type="number"
                  placeholder="9999"
                  value={filters.max_price}
                  onChange={(e) => handleFilterChange('max_price', e.target.value)}
                />
              </FilterGroup>

              <FilterGroup>
                <h3>Tri</h3>
                <FilterSelect
                  value={filters.ordering}
                  onChange={(e) => handleFilterChange('ordering', e.target.value)}
                >
                  <option value="-created_at">Plus récent</option>
                  <option value="price">Prix croissant</option>
                  <option value="-price">Prix décroissant</option>
                  <option value="-rating">Mieux noté</option>
                  <option value="name">Nom A-Z</option>
                </FilterSelect>
              </FilterGroup>

              <FilterGroup>
                <h3>Options</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <input
                      type="checkbox"
                      checked={filters.in_stock}
                      onChange={(e) => handleFilterChange('in_stock', e.target.checked)}
                    />
                    En stock seulement
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <input
                      type="checkbox"
                      checked={filters.featured}
                      onChange={(e) => handleFilterChange('featured', e.target.checked)}
                    />
                    Produits vedettes
                  </label>
                </div>
              </FilterGroup>

              <FilterGroup>
                <h3>Actions</h3>
                <ClearFiltersButton onClick={clearFilters}>
                  Effacer les filtres
                </ClearFiltersButton>
              </FilterGroup>
            </FiltersGrid>
          </FiltersSection>
        </HeaderContent>
      </CatalogHeader>

      <ProductsSection>
        <ProductsHeader>
          <ResultsCount>
            {pagination.count} produit{pagination.count > 1 ? 's' : ''} trouvé{pagination.count > 1 ? 's' : ''}
          </ResultsCount>
        </ProductsHeader>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
            <div className="loading"></div>
          </div>
        ) : (
          <>
            <ProductsGrid>
              {products.map((product) => (
                <ProductCard key={product.id}>
                  <ProductImage>
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <div style={{ fontSize: '3rem', color: 'var(--neon-green)' }}>
                        <FaCog />
                      </div>
                    )}
                    <ProductOverlay>
                      <OverlayButton onClick={() => handleAddToCart(product.id)}>
                        <FaShoppingCart /> Ajouter
                      </OverlayButton>
                      <OverlayButton as={Link} to={`/products/${product.slug}`}>
                        <FaEye /> Voir
                      </OverlayButton>
                    </ProductOverlay>
                  </ProductImage>
                  <ProductInfo>
                    <ProductName>{product.name}</ProductName>
                    <ProductDescription>{product.short_description}</ProductDescription>
                    <ProductPrice>${product.price}</ProductPrice>
                    <ProductRating>
                      <FaStar />
                      <span>{product.rating}</span>
                      <span>({product.review_count})</span>
                    </ProductRating>
                    <ProductStock inStock={product.in_stock}>
                      {product.in_stock ? 'En stock' : 'Rupture de stock'}
                    </ProductStock>
                  </ProductInfo>
                </ProductCard>
              ))}
            </ProductsGrid>

            {pagination.total > 1 && (
              <Pagination>
                <PageButton
                  onClick={() => handlePageChange(pagination.current - 1)}
                  disabled={pagination.current === 1}
                >
                  Précédent
                </PageButton>
                
                {[...Array(pagination.total)].map((_, index) => (
                  <PageButton
                    key={index + 1}
                    active={pagination.current === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PageButton>
                ))}
                
                <PageButton
                  onClick={() => handlePageChange(pagination.current + 1)}
                  disabled={pagination.current === pagination.total}
                >
                  Suivant
                </PageButton>
              </Pagination>
            )}
          </>
        )}
      </ProductsSection>
    </CatalogContainer>
  );
};

export default CatalogPage;
