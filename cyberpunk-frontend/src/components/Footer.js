import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaDiscord, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: var(--bg-secondary);
  border-top: 2px solid var(--neon-green);
  padding: var(--spacing-xxl) 0 var(--spacing-lg);
  margin-top: var(--spacing-xxl);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
`;

const FooterSection = styled.div`
  h3 {
    color: var(--neon-green);
    margin-bottom: var(--spacing-lg);
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

const FooterLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  display: block;
  margin-bottom: var(--spacing-sm);
  transition: all var(--transition-normal);

  &:hover {
    color: var(--neon-green);
    text-shadow: var(--shadow-neon);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  color: var(--text-secondary);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
`;

const SocialLink = styled.a`
  color: var(--neon-green);
  font-size: 1.5rem;
  transition: all var(--transition-normal);

  &:hover {
    color: var(--neon-purple);
    transform: translateY(-3px);
    text-shadow: var(--shadow-neon-purple);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid var(--border-primary);
  padding-top: var(--spacing-lg);
  text-align: center;
  color: var(--text-muted);
`;

const NeonText = styled.span`
  color: var(--neon-green);
  text-shadow: var(--shadow-neon);
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>CyberShop</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Votre destination ultime pour la technologie cyberpunk de demain. 
              Implants, interfaces neuronales et équipements futuristes de pointe.
            </p>
            <SocialLinks>
              <SocialLink href="#" aria-label="GitHub">
                <FaGithub />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="#" aria-label="Discord">
                <FaDiscord />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Navigation</h3>
            <FooterLink href="/">Accueil</FooterLink>
            <FooterLink href="/products">Produits</FooterLink>
            <FooterLink href="/categories">Catégories</FooterLink>
            <FooterLink href="/about">À propos</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>Support</h3>
            <FooterLink href="/help">Aide</FooterLink>
            <FooterLink href="/shipping">Livraison</FooterLink>
            <FooterLink href="/returns">Retours</FooterLink>
            <FooterLink href="/warranty">Garantie</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>Contact</h3>
            <ContactInfo>
              <FaMapMarkerAlt />
              <span>Neo-Tokyo, District 7</span>
            </ContactInfo>
            <ContactInfo>
              <FaPhone />
              <span>+1 (555) CYBER-01</span>
            </ContactInfo>
            <ContactInfo>
              <FaEnvelope />
              <span>info@cybershop.neon</span>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>
            © 2024 <NeonText>CyberShop</NeonText>. Tous droits réservés. 
            | Propulsé par la technologie du futur
          </p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
