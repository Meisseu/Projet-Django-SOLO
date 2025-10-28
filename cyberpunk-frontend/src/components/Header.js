import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaUser, FaHome, FaBoxes } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const HeaderContainer = styled.header`
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid var(--neon-green);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: var(--spacing-md) 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 900;
  text-decoration: none;
  background: linear-gradient(45deg, var(--neon-green), var(--neon-yellow), var(--neon-purple));
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-secondary);
    flex-direction: column;
    padding: var(--spacing-lg);
    border-top: 1px solid var(--neon-green);
  }
`;

const NavLink = styled(Link)`
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all var(--transition-normal);
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  &:hover {
    color: var(--neon-green);
    text-shadow: var(--shadow-neon);
  }

  &.active {
    color: var(--neon-green);
    text-shadow: var(--shadow-neon);
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  background: var(--bg-secondary);
  border: 2px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-primary);
  font-family: var(--font-primary);
  width: 200px;
  transition: all var(--transition-normal);

  &:focus {
    outline: none;
    border-color: var(--neon-green);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: var(--spacing-sm);
  color: var(--neon-green);
  cursor: pointer;
`;

const CartButton = styled.button`
  background: transparent;
  border: 2px solid var(--neon-green);
  color: var(--neon-green);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  &:hover {
    background: var(--neon-green);
    color: var(--bg-primary);
    box-shadow: var(--shadow-neon);
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--neon-purple);
  color: var(--bg-primary);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: var(--neon-green);
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useApp();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">CyberShop</Logo>
        
        <Nav isOpen={isMenuOpen}>
          <NavLink to="/">
            <FaHome /> Accueil
          </NavLink>
          <NavLink to="/products">
            <FaBoxes /> Produits
          </NavLink>
          <NavLink to="/categories">
            Catégories
          </NavLink>
          
          <SearchContainer>
            <form onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon onClick={handleSearch} />
            </form>
          </SearchContainer>
          
          <NavLink to="/cart">
            <CartButton>
              <FaShoppingCart />
              Panier
              {cart.total_items > 0 && (
                <CartBadge>{cart.total_items}</CartBadge>
              )}
            </CartButton>
          </NavLink>
          
          <NavLink to="/profile">
            <FaUser /> Profil
          </NavLink>
        </Nav>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
