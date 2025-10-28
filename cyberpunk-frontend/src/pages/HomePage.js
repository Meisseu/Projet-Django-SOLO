import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaRocket, FaShieldAlt, FaCog, FaStar } from 'react-icons/fa';
import { apiService } from '../services/api';

const HomeContainer = styled.div`
  padding-top: 80px; /* Account for fixed header */
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(255, 0, 255, 0.1));
  padding: var(--spacing-xxl) 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%2300ff00" stroke-width="0.5" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
  text-shadow: 0 0 30px var(--neon-green);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: linear-gradient(45deg, var(--neon-green), var(--neon-purple));
  color: var(--bg-primary);
  padding: var(--spacing-lg) var(--spacing-xxl);
  border-radius: var(--radius-lg);
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: var(--shadow-neon);
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 30px var(--neon-green);
  }
`;

const FeaturesSection = styled.section`
  padding: var(--spacing-xxl) 0;
  background: var(--bg-secondary);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
`;

const FeatureCard = styled(motion.div)`
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--neon-green), var(--neon-purple), var(--neon-yellow));
    opacity: 0;
    transition: opacity var(--transition-normal);
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    border-color: var(--neon-green);
    box-shadow: var(--shadow-neon);
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: var(--neon-green);
  margin-bottom: var(--spacing-lg);
`;

const FeatureTitle = styled.h3`
  color: var(--neon-yellow);
  margin-bottom: var(--spacing-md);
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const ProductsSection = styled.section`
  padding: var(--spacing-xxl) 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: var(--spacing-xxl);
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
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
  height: 200px;
  background: linear-gradient(45deg, var(--bg-tertiary), var(--bg-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--neon-green);
`;

const ProductInfo = styled.div`
  padding: var(--spacing-lg);
`;

const ProductName = styled.h4`
  color: var(--neon-yellow);
  margin-bottom: var(--spacing-sm);
`;

const ProductPrice = styled.div`
  color: var(--neon-green);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  color: var(--neon-yellow);
`;

const ViewAllButton = styled(Link)`
  display: block;
  text-align: center;
  margin-top: var(--spacing-xl);
  color: var(--neon-green);
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all var(--transition-normal);

  &:hover {
    text-shadow: var(--shadow-neon);
  }
`;

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await apiService.getFeaturedProducts();
      setFeaturedProducts(response.data.slice(0, 6)); // Show only 6 products
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroTitle variants={itemVariants}>
              Bienvenue dans le Futur
            </HeroTitle>
            <HeroSubtitle variants={itemVariants}>
              Découvrez la technologie cyberpunk de demain. Implants, interfaces neuronales 
              et équipements futuristes de pointe pour transcender l'humanité.
            </HeroSubtitle>
            <motion.div variants={itemVariants}>
              <CTAButton to="/products">
                Explorer les Produits
                <FaArrowRight />
              </CTAButton>
            </motion.div>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionTitle>Pourquoi Choisir CyberShop ?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard variants={itemVariants}>
              <FeatureIcon>
                <FaRocket />
              </FeatureIcon>
              <FeatureTitle>Technologie Avancée</FeatureTitle>
              <FeatureDescription>
                Nos produits utilisent les dernières innovations en matière de cybernétique 
                et d'intelligence artificielle.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard variants={itemVariants}>
              <FeatureIcon>
                <FaShieldAlt />
              </FeatureIcon>
              <FeatureTitle>Sécurité Garantie</FeatureTitle>
              <FeatureDescription>
                Tous nos implants sont certifiés et testés pour garantir votre sécurité 
                et votre bien-être.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard variants={itemVariants}>
              <FeatureIcon>
                <FaCog />
              </FeatureIcon>
              <FeatureTitle>Support 24/7</FeatureTitle>
              <FeatureDescription>
                Notre équipe technique est disponible 24h/24 pour vous accompagner 
                dans votre transformation cyberpunk.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </motion.div>
      </FeaturesSection>

      <ProductsSection>
        <SectionTitle>Produits Vedettes</SectionTitle>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
            <div className="loading"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ProductsGrid>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} variants={itemVariants}>
                  <ProductImage>
                    {product.image ? (
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <FaCog />
                    )}
                  </ProductImage>
                  <ProductInfo>
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice>${product.price}</ProductPrice>
                    <ProductRating>
                      <FaStar />
                      <span>{product.rating}</span>
                      <span>({product.review_count})</span>
                    </ProductRating>
                    <CTAButton to={`/products/${product.slug}`}>
                      Voir Détails
                    </CTAButton>
                  </ProductInfo>
                </ProductCard>
              ))}
            </ProductsGrid>
            <ViewAllButton to="/products">
              Voir Tous les Produits →
            </ViewAllButton>
          </motion.div>
        )}
      </ProductsSection>
    </HomeContainer>
  );
};

export default HomePage;
