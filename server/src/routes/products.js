import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

const sampleProducts = [
  {
    name: 'Fresh Bananas',
    description: 'Ripe Cavendish bananas perfect for snacking.',
    price: 49,
    originalPrice: 69,
    discountLabel: '29% OFF',
    image: '🍌',
    categoryKey: 'fruits',
    categoryName: 'Fruits',
    categoryIcon: 'apple',
    tags: ['featured'],
  },
  {
    name: 'Seasonal Mangoes',
    description: 'Juicy Alphonso mangoes directly from the farm.',
    price: 149,
    originalPrice: 189,
    discountLabel: 'Save ₹40',
    image: '🥭',
    categoryKey: 'fruits',
    categoryName: 'Fruits',
    categoryIcon: 'apple',
    tags: ['featured', 'bestseller'],
  },
  {
    name: 'Green Apples',
    description: 'Crisp Granny Smith apples rich in antioxidants.',
    price: 199,
    originalPrice: 225,
    discountLabel: '12% OFF',
    image: '🍏',
    categoryKey: 'fruits',
    categoryName: 'Fruits',
    categoryIcon: 'apple',
    tags: ['bestseller'],
  },
  {
    name: 'Organic Tomatoes',
    description: 'Fresh organic tomatoes for salads and cooking.',
    price: 39,
    originalPrice: 59,
    discountLabel: '34% OFF',
    image: '🍅',
    categoryKey: 'vegetables',
    categoryName: 'Vegetables',
    categoryIcon: 'leaf',
    tags: ['featured'],
  },
  {
    name: 'Carrots 500g',
    description: 'Farm fresh carrots rich in beta-carotene.',
    price: 29,
    originalPrice: 39,
    discountLabel: 'Save ₹10',
    image: '🥕',
    categoryKey: 'vegetables',
    categoryName: 'Vegetables',
    categoryIcon: 'leaf',
    tags: ['bestseller'],
  },
  {
    name: 'Spinach Bunch',
    description: 'Leafy green spinach packed with iron.',
    price: 25,
    originalPrice: 30,
    discountLabel: '17% OFF',
    image: '🥬',
    categoryKey: 'vegetables',
    categoryName: 'Vegetables',
    categoryIcon: 'leaf',
    tags: [],
  },
  {
    name: 'Fresh Milk 1L',
    description: 'Pasteurized whole milk sourced daily.',
    price: 58,
    originalPrice: 68,
    discountLabel: '15% OFF',
    image: '🥛',
    categoryKey: 'dairy',
    categoryName: 'Dairy',
    categoryIcon: 'glass',
    tags: ['featured'],
  },
  {
    name: 'Greek Yogurt',
    description: 'Creamy and thick Greek yogurt, 400g tub.',
    price: 89,
    originalPrice: 109,
    discountLabel: 'Save ₹20',
    image: '🍶',
    categoryKey: 'dairy',
    categoryName: 'Dairy',
    categoryIcon: 'glass',
    tags: ['bestseller'],
  },
  {
    name: 'Salted Butter',
    description: 'Rich and creamy salted butter, 200g pack.',
    price: 120,
    originalPrice: 140,
    discountLabel: '14% OFF',
    image: '🧈',
    categoryKey: 'dairy',
    categoryName: 'Dairy',
    categoryIcon: 'glass',
    tags: [],
  },
  {
    name: 'Cold Coffee',
    description: 'Ready-to-drink cold coffee bottle, 250ml.',
    price: 79,
    originalPrice: 95,
    discountLabel: 'Save ₹16',
    image: '🥤',
    categoryKey: 'beverages',
    categoryName: 'Beverages',
    categoryIcon: 'coffee',
    tags: ['featured'],
  },
  {
    name: 'Fresh Lemonade',
    description: 'Refreshing lemonade made with real lemons.',
    price: 59,
    originalPrice: 75,
    discountLabel: '21% OFF',
    image: '🍋',
    categoryKey: 'beverages',
    categoryName: 'Beverages',
    categoryIcon: 'coffee',
    tags: [],
  },
  {
    name: 'Coconut Water',
    description: 'Natural coconut water full of electrolytes.',
    price: 45,
    originalPrice: 55,
    discountLabel: 'Save ₹10',
    image: '🥥',
    categoryKey: 'beverages',
    categoryName: 'Beverages',
    categoryIcon: 'coffee',
    tags: ['bestseller'],
  },
  {
    name: 'Masala Chips',
    description: 'Crispy potato chips with masala seasoning.',
    price: 30,
    originalPrice: 40,
    discountLabel: '25% OFF',
    image: '🍟',
    categoryKey: 'snacks',
    categoryName: 'Snacks',
    categoryIcon: 'cookie',
    tags: ['featured'],
  },
  {
    name: 'Salted Peanuts',
    description: 'Roasted peanuts with a light salty crunch.',
    price: 60,
    originalPrice: 70,
    discountLabel: 'Save ₹10',
    image: '🥜',
    categoryKey: 'snacks',
    categoryName: 'Snacks',
    categoryIcon: 'cookie',
    tags: ['bestseller'],
  },
  {
    name: 'Dark Chocolate',
    description: '70% cocoa dark chocolate bar.',
    price: 110,
    originalPrice: 140,
    discountLabel: '21% OFF',
    image: '🍫',
    categoryKey: 'snacks',
    categoryName: 'Snacks',
    categoryIcon: 'cookie',
    tags: [],
  },
  {
    name: 'Chicken Breast 500g',
    description: 'Lean and tender chicken breast cuts.',
    price: 210,
    originalPrice: 240,
    discountLabel: 'Save ₹30',
    image: '🍗',
    categoryKey: 'meat',
    categoryName: 'Meat',
    categoryIcon: 'cutlery',
    tags: ['featured'],
  },
  {
    name: 'Fresh Salmon',
    description: 'Premium Atlantic salmon fillet, 400g.',
    price: 450,
    originalPrice: 499,
    discountLabel: 'Save ₹49',
    image: '🐟',
    categoryKey: 'meat',
    categoryName: 'Meat',
    categoryIcon: 'cutlery',
    tags: [],
  },
  {
    name: 'Mutton Curry Cut',
    description: 'Tender mutton curry pieces, 500g.',
    price: 520,
    originalPrice: 560,
    discountLabel: 'Save ₹40',
    image: '🥩',
    categoryKey: 'meat',
    categoryName: 'Meat',
    categoryIcon: 'cutlery',
    tags: ['bestseller'],
  },
  {
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole wheat bread loaf.',
    price: 45,
    originalPrice: 55,
    discountLabel: '18% OFF',
    image: '🍞',
    categoryKey: 'bakery',
    categoryName: 'Bakery',
    categoryIcon: 'birthday-cake',
    tags: ['featured'],
  },
  {
    name: 'Blueberry Muffins',
    description: 'Soft muffins with real blueberries, pack of 2.',
    price: 150,
    originalPrice: 175,
    discountLabel: '14% OFF',
    image: '🧁',
    categoryKey: 'bakery',
    categoryName: 'Bakery',
    categoryIcon: 'birthday-cake',
    tags: [],
  },
  {
    name: 'Garlic Breadsticks',
    description: 'Crispy garlic breadsticks, pack of 6.',
    price: 95,
    originalPrice: 115,
    discountLabel: 'Save ₹20',
    image: '🥖',
    categoryKey: 'bakery',
    categoryName: 'Bakery',
    categoryIcon: 'birthday-cake',
    tags: ['bestseller'],
  },
  {
    name: 'Frozen Peas 500g',
    description: 'Farm fresh peas flash frozen to lock nutrients.',
    price: 80,
    originalPrice: 98,
    discountLabel: '18% OFF',
    image: '🟢',
    categoryKey: 'frozen',
    categoryName: 'Frozen',
    categoryIcon: 'snowflake-o',
    tags: ['featured'],
  },
  {
    name: 'Ice Cream Tub',
    description: 'Family pack vanilla ice cream, 1L.',
    price: 199,
    originalPrice: 229,
    discountLabel: 'Save ₹30',
    image: '🍨',
    categoryKey: 'frozen',
    categoryName: 'Frozen',
    categoryIcon: 'snowflake-o',
    tags: ['bestseller'],
  },
  {
    name: 'Veggie Nuggets',
    description: 'Crispy vegetable nuggets, 400g pack.',
    price: 150,
    originalPrice: 180,
    discountLabel: '17% OFF',
    image: '🍢',
    categoryKey: 'frozen',
    categoryName: 'Frozen',
    categoryIcon: 'snowflake-o',
    tags: [],
  },
];

const ensureSeedData = async () => {
  const existingCount = await Product.countDocuments();
  if (existingCount === 0) {
    await Product.insertMany(sampleProducts);
  }
};

router.get('/', async (req, res, next) => {
  try {
    await ensureSeedData();
    const products = await Product.find({ isActive: true }).sort({ name: 1 }).lean();

    const categoriesMap = new Map();
    products.forEach((product) => {
      if (!categoriesMap.has(product.categoryKey)) {
        categoriesMap.set(product.categoryKey, {
          id: product.categoryKey,
          name: product.categoryName,
          icon: product.categoryIcon,
        });
      }
    });

    const categories = Array.from(categoriesMap.values());

    const formatProduct = (product) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      discountLabel: product.discountLabel,
      image: product.image,
      categoryId: product.categoryKey,
      tags: product.tags || [],
    });

    const featuredProducts = products.filter((product) =>
      (product.tags || []).includes('featured')
    );
    const bestSellers = products.filter((product) =>
      (product.tags || []).includes('bestseller')
    );

    res.json({
      success: true,
      data: {
        categories,
        products: products.map(formatProduct),
        featured: featuredProducts.map(formatProduct),
        bestSellers: bestSellers.map(formatProduct),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/category/:categoryId', async (req, res, next) => {
  try {
    await ensureSeedData();
    const { categoryId } = req.params;
    const products = await Product.find({
      isActive: true,
      categoryKey: categoryId.toLowerCase(),
    })
      .sort({ name: 1 })
      .lean();

    res.json({
      success: true,
      data: products.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        discountLabel: product.discountLabel,
        image: product.image,
        categoryId: product.categoryKey,
        tags: product.tags || [],
      })),
    });
  } catch (error) {
    next(error);
  }
});

export default router;


