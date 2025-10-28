import os
import django
from django.core.files import File

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cyberpunk_ecommerce.settings')
django.setup()

from shop.models import Category, Product, ProductImage, Review
from django.contrib.auth.models import User

def create_sample_data():
    # Créer un utilisateur de test
    user, created = User.objects.get_or_create(
        username='cyberpunk_user',
        defaults={
            'email': 'user@cyberpunk.com',
            'first_name': 'Cyber',
            'last_name': 'Punk'
        }
    )
    
    # Créer les catégories cyberpunk
    categories_data = [
        {
            'name': 'Cyberware Implants',
            'slug': 'cyberware-implants',
            'description': 'Implants cybernétiques de dernière génération pour améliorer vos capacités humaines.'
        },
        {
            'name': 'Neural Interfaces',
            'slug': 'neural-interfaces',
            'description': 'Interfaces neuronales pour connecter votre cerveau aux réseaux digitaux.'
        },
        {
            'name': 'Holographic Displays',
            'slug': 'holographic-displays',
            'description': 'Affichages holographiques haute résolution pour une expérience immersive.'
        },
        {
            'name': 'Quantum Processors',
            'slug': 'quantum-processors',
            'description': 'Processeurs quantiques ultra-rapides pour les calculs les plus complexes.'
        },
        {
            'name': 'Energy Weapons',
            'slug': 'energy-weapons',
            'description': 'Armes à énergie pure pour la défense et la sécurité.'
        }
    ]
    
    categories = []
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults=cat_data
        )
        categories.append(category)
    
    # Créer les produits cyberpunk
    products_data = [
        {
            'name': 'Neural Link Pro X1',
            'slug': 'neural-link-pro-x1',
            'description': 'Interface neuronale de pointe permettant une connexion directe cerveau-machine. Compatible avec tous les réseaux cyberpunk et offrant une latence ultra-faible.',
            'short_description': 'Interface neuronale de pointe pour connexion cerveau-machine',
            'price': 2499.99,
            'category': categories[1],
            'stock_quantity': 15,
            'is_featured': True,
            'rating': 4.8
        },
        {
            'name': 'Cyber Eye Alpha',
            'slug': 'cyber-eye-alpha',
            'description': 'Œil cybernétique avec vision nocturne, zoom x50, reconnaissance faciale et affichage HUD intégré. Design futuriste avec LED néon verte.',
            'short_description': 'Œil cybernétique avec vision nocturne et HUD intégré',
            'price': 1899.99,
            'category': categories[0],
            'stock_quantity': 8,
            'is_featured': True,
            'rating': 4.6
        },
        {
            'name': 'Holo-Projector Matrix',
            'slug': 'holo-projector-matrix',
            'description': 'Projecteur holographique portable capable de créer des projections 3D ultra-réalistes. Parfait pour les présentations et le divertissement.',
            'short_description': 'Projecteur holographique portable pour projections 3D',
            'price': 1299.99,
            'category': categories[2],
            'stock_quantity': 25,
            'is_featured': False,
            'rating': 4.4
        },
        {
            'name': 'Quantum Core Processor',
            'slug': 'quantum-core-processor',
            'description': 'Processeur quantique révolutionnaire offrant des performances de calcul inégalées. Idéal pour l\'IA, la cryptographie et les simulations complexes.',
            'short_description': 'Processeur quantique révolutionnaire pour calculs ultra-rapides',
            'price': 4999.99,
            'category': categories[3],
            'stock_quantity': 3,
            'is_featured': True,
            'rating': 4.9
        },
        {
            'name': 'Plasma Rifle MK2',
            'slug': 'plasma-rifle-mk2',
            'description': 'Arme à plasma de nouvelle génération avec système de refroidissement avancé et viseur laser intégré. Design cyberpunk avec accents néon.',
            'short_description': 'Arme à plasma nouvelle génération avec viseur laser',
            'price': 3299.99,
            'category': categories[4],
            'stock_quantity': 5,
            'is_featured': False,
            'rating': 4.7
        },
        {
            'name': 'Cyber Arm Titan',
            'slug': 'cyber-arm-titan',
            'description': 'Bras cybernétique ultra-robuste avec force surhumaine et outils intégrés. Compatible avec tous les implants cyberpunk standards.',
            'short_description': 'Bras cybernétique ultra-robuste avec force surhumaine',
            'price': 2799.99,
            'category': categories[0],
            'stock_quantity': 12,
            'is_featured': False,
            'rating': 4.5
        },
        {
            'name': 'Neural Boost Chip',
            'slug': 'neural-boost-chip',
            'description': 'Puce d\'amélioration neuronale augmentant les capacités cognitives et la vitesse de traitement de l\'information.',
            'short_description': 'Puce d\'amélioration neuronale pour capacités cognitives',
            'price': 899.99,
            'category': categories[1],
            'stock_quantity': 30,
            'is_featured': False,
            'rating': 4.3
        },
        {
            'name': 'Holographic Interface',
            'slug': 'holographic-interface',
            'description': 'Interface holographique tactile permettant l\'interaction directe avec les données numériques dans l\'espace 3D.',
            'short_description': 'Interface holographique tactile pour interaction 3D',
            'price': 1599.99,
            'category': categories[2],
            'stock_quantity': 18,
            'is_featured': False,
            'rating': 4.2
        }
    ]
    
    products = []
    for prod_data in products_data:
        product, created = Product.objects.get_or_create(
            slug=prod_data['slug'],
            defaults=prod_data
        )
        products.append(product)
    
    # Créer quelques avis
    reviews_data = [
        {
            'product': products[0],
            'user': user,
            'rating': 5,
            'title': 'Révolutionnaire !',
            'comment': 'Cette interface neuronale a complètement changé ma façon d\'interagir avec la technologie. La connexion est instantanée et l\'expérience est incroyable.'
        },
        {
            'product': products[1],
            'user': user,
            'rating': 4,
            'title': 'Excellent produit',
            'comment': 'La vision nocturne est parfaite et le HUD est très pratique. Seul bémol : la batterie pourrait durer plus longtemps.'
        },
        {
            'product': products[3],
            'user': user,
            'rating': 5,
            'title': 'Performance exceptionnelle',
            'comment': 'Ce processeur quantique est absolument incroyable. Les calculs complexes se font en temps réel. Un investissement qui vaut le coup !'
        }
    ]
    
    for review_data in reviews_data:
        Review.objects.get_or_create(
            product=review_data['product'],
            user=review_data['user'],
            defaults=review_data
        )
    
    print("Données de test créées avec succès !")
    print(f"- {len(categories)} catégories créées")
    print(f"- {len(products)} produits créés")
    print(f"- {len(reviews_data)} avis créés")

if __name__ == '__main__':
    create_sample_data()
