import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaShare, FaArrowLeft, FaPlus, FaMinus } from 'react-icons/fa';
import { apiService } from '../services/api';
import { useApp } from '../context/AppContext';

const ProductContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const Breadcrumb = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

const BreadcrumbLink = styled(Link)`
  color: var(--neon-green);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: all var(--transition-normal);

  &:hover {
    text-shadow: var(--shadow-neon);
  }
`;

const ProductSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  margin-bottom: var(--spacing-xxl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
`;

const ProductImages = styled.div`
  position: relative;
`;

const MainImage = styled.div`
  width: 100%;
  height: 500px;
  background: var(--bg-card);
  border: 2px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--spacing-lg);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: var(--spacing-sm);
`;

const ThumbnailImage = styled.div`
  width: 80px;
  height: 80px;
  background: var(--bg-secondary);
  border: 2px solid ${props => props.active ? 'var(--neon-green)' : 'var(--border-primary)'};
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    border-color: var(--neon-green);
    box-shadow: var(--shadow-neon);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
`;

const ProductTitle = styled.h1`
  color: var(--neon-yellow);
  margin-bottom: var(--spacing-md);
  font-size: 2.5rem;
`;

const ProductPrice = styled.div`
  color: var(--neon-green);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  color: var(--neon-yellow);
`;

const ProductDescription = styled.div`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-xl);
  font-size: 1.1rem;
`;

const ProductFeatures = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
  padding-left: var(--spacing-lg);
  position: relative;

  &::before {
    content: '▶';
    position: absolute;
    left: 0;
    color: var(--neon-green);
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
`;

const QuantityButton = styled.button`
  background: var(--bg-secondary);
  border: 2px solid var(--neon-green);
  color: var(--neon-green);
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--neon-green);
    color: var(--bg-primary);
    box-shadow: var(--shadow-neon);
  }
`;

const QuantityInput = styled.input`
  width: 80px;
  text-align: center;
  padding: var(--spacing-sm);
  background: var(--bg-secondary);
  border: 2px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
`;

const PrimaryButton = styled.button`
  flex: 1;
  background: linear-gradient(45deg, var(--neon-green), var(--neon-purple));
  color: var(--bg-primary);
  border: none;
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-neon);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  border: 2px solid var(--neon-purple);
  color: var(--neon-purple);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--neon-purple);
    color: var(--bg-primary);
    box-shadow: var(--shadow-neon-purple);
  }
`;

const ProductMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
`;

const MetaItem = styled.div`
  background: var(--bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  text-align: center;

  h4 {
    color: var(--neon-green);
    margin-bottom: var(--spacing-sm);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    color: var(--text-secondary);
    font-weight: 600;
  }
`;

const ReviewsSection = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-top: var(--spacing-xxl);
`;

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
`;

const ReviewCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);

  &:last-child {
    margin-bottom: 0;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const ReviewAuthor = styled.div`
  font-weight: 600;
  color: var(--neon-green);
`;

const ReviewRating = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  color: var(--neon-yellow);
`;

const ReviewTitle = styled.h4`
  color: var(--neon-yellow);
  margin-bottom: var(--spacing-sm);
`;

const ReviewText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useApp();

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProduct(slug);
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
      // Show success notification
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock_quantity) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <ProductContainer>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
          <div className="loading"></div>
        </div>
      </ProductContainer>
    );
  }

  if (!product) {
    return (
      <ProductContainer>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
          <h2>Produit non trouvé</h2>
          <Link to="/products">Retour au catalogue</Link>
        </div>
      </ProductContainer>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [{ image: product.image, is_primary: true }];

  return (
    <ProductContainer>
      <Breadcrumb>
        <BreadcrumbLink to="/products">
          <FaArrowLeft />
          Retour au catalogue
        </BreadcrumbLink>
      </Breadcrumb>

      <ProductSection>
        <ProductGrid>
          <ProductImages>
            <MainImage>
              {images[selectedImage]?.image ? (
                <img src={images[selectedImage].image} alt={product.name} />
              ) : (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '4rem',
                  color: 'var(--neon-green)'
                }}>
                  <FaCog />
                </div>
              )}
            </MainImage>
            
            {images.length > 1 && (
              <ImageGallery>
                {images.map((image, index) => (
                  <ThumbnailImage
                    key={index}
                    active={selectedImage === index}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image.image} alt={`${product.name} ${index + 1}`} />
                  </ThumbnailImage>
                ))}
              </ImageGallery>
            )}
          </ProductImages>

          <ProductInfo>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductPrice>${product.price}</ProductPrice>
            
            <ProductRating>
              <FaStar />
              <span>{product.rating}</span>
              <span>({product.review_count} avis)</span>
            </ProductRating>

            <ProductDescription>
              {product.description}
            </ProductDescription>

            <ProductFeatures>
              <h3 style={{ color: 'var(--neon-green)', marginBottom: 'var(--spacing-md)' }}>
                Caractéristiques
              </h3>
              <FeatureList>
                <FeatureItem>Technologie cyberpunk de pointe</FeatureItem>
                <FeatureItem>Interface utilisateur intuitive</FeatureItem>
                <FeatureItem>Compatible avec tous les systèmes</FeatureItem>
                <FeatureItem>Garantie 2 ans</FeatureItem>
                <FeatureItem>Support technique 24/7</FeatureItem>
              </FeatureList>
            </ProductFeatures>

            <QuantitySelector>
              <label style={{ color: 'var(--neon-green)', fontWeight: '600' }}>
                Quantité:
              </label>
              <QuantityButton onClick={() => handleQuantityChange(-1)}>
                <FaMinus />
              </QuantityButton>
              <QuantityInput
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
                max={product.stock_quantity}
              />
              <QuantityButton onClick={() => handleQuantityChange(1)}>
                <FaPlus />
              </QuantityButton>
            </QuantitySelector>

            <ActionButtons>
              <PrimaryButton onClick={handleAddToCart}>
                <FaShoppingCart />
                Ajouter au panier
              </PrimaryButton>
              <SecondaryButton>
                <FaHeart />
              </SecondaryButton>
              <SecondaryButton>
                <FaShare />
              </SecondaryButton>
            </ActionButtons>

            <ProductMeta>
              <MetaItem>
                <h4>Stock</h4>
                <p style={{ color: product.in_stock ? 'var(--neon-green)' : 'var(--neon-purple)' }}>
                  {product.in_stock ? `${product.stock_quantity} disponibles` : 'Rupture de stock'}
                </p>
              </MetaItem>
              <MetaItem>
                <h4>Catégorie</h4>
                <p>{product.category?.name}</p>
              </MetaItem>
              <MetaItem>
                <h4>Garantie</h4>
                <p>2 ans</p>
              </MetaItem>
              <MetaItem>
                <h4>Livraison</h4>
                <p>24-48h</p>
              </MetaItem>
            </ProductMeta>
          </ProductInfo>
        </ProductGrid>

        {product.reviews && product.reviews.length > 0 && (
          <ReviewsSection>
            <ReviewsHeader>
              <h2>Avis clients</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <FaStar />
                <span>{product.rating}</span>
                <span>({product.review_count} avis)</span>
              </div>
            </ReviewsHeader>
            
            {product.reviews.map((review) => (
              <ReviewCard key={review.id}>
                <ReviewHeader>
                  <ReviewAuthor>{review.user}</ReviewAuthor>
                  <ReviewRating>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} style={{ 
                        color: i < review.rating ? 'var(--neon-yellow)' : 'var(--text-muted)' 
                      }} />
                    ))}
                  </ReviewRating>
                </ReviewHeader>
                <ReviewTitle>{review.title}</ReviewTitle>
                <ReviewText>{review.comment}</ReviewText>
              </ReviewCard>
            ))}
          </ReviewsSection>
        )}
      </ProductSection>
    </ProductContainer>
  );
};

export default ProductDetailPage;
