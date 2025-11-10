import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Sample data
const categories = [
  { id: 1, name: "Fruits", icon: "apple" },
  { id: 2, name: "Vegetables", icon: "leaf" },
  { id: 3, name: "Dairy", icon: "glass" },
  { id: 4, name: "Beverages", icon: "coffee" },
  { id: 5, name: "Snacks", icon: "cookie" },
  { id: 6, name: "Meat", icon: "cutlery" },
  { id: 7, name: "Bakery", icon: "birthday-cake" },
  { id: 8, name: "Frozen", icon: "snowflake-o" },
];

const categoryProducts = [
  // Fruits
  {
    id: "fruits-1",
    categoryId: 1,
    name: "Fresh Bananas",
    price: "₹49",
    image: "🍌",
  },
  {
    id: "fruits-2",
    categoryId: 1,
    name: "Seasonal Mangoes",
    price: "₹149",
    image: "🥭",
  },
  {
    id: "fruits-3",
    categoryId: 1,
    name: "Green Apples",
    price: "₹199",
    image: "🍏",
  },
  // Vegetables
  {
    id: "veg-1",
    categoryId: 2,
    name: "Organic Tomatoes",
    price: "₹39",
    image: "🍅",
  },
  {
    id: "veg-2",
    categoryId: 2,
    name: "Carrots 500g",
    price: "₹29",
    image: "🥕",
  },
  {
    id: "veg-3",
    categoryId: 2,
    name: "Spinach Bunch",
    price: "₹25",
    image: "🥬",
  },
  // Dairy
  {
    id: "dairy-1",
    categoryId: 3,
    name: "Fresh Milk 1L",
    price: "₹58",
    image: "🥛",
  },
  {
    id: "dairy-2",
    categoryId: 3,
    name: "Greek Yogurt",
    price: "₹89",
    image: "🍶",
  },
  {
    id: "dairy-3",
    categoryId: 3,
    name: "Salted Butter",
    price: "₹120",
    image: "🧈",
  },
  // Beverages
  {
    id: "bev-1",
    categoryId: 4,
    name: "Cold Coffee",
    price: "₹79",
    image: "🥤",
  },
  {
    id: "bev-2",
    categoryId: 4,
    name: "Fresh Lemonade",
    price: "₹59",
    image: "🍋",
  },
  {
    id: "bev-3",
    categoryId: 4,
    name: "Coconut Water",
    price: "₹45",
    image: "🥥",
  },
  // Snacks
  {
    id: "snacks-1",
    categoryId: 5,
    name: "Masala Chips",
    price: "₹30",
    image: "🍟",
  },
  {
    id: "snacks-2",
    categoryId: 5,
    name: "Salted Peanuts",
    price: "₹60",
    image: "🥜",
  },
  {
    id: "snacks-3",
    categoryId: 5,
    name: "Dark Chocolate",
    price: "₹110",
    image: "🍫",
  },
  // Meat
  {
    id: "meat-1",
    categoryId: 6,
    name: "Chicken Breast 500g",
    price: "₹210",
    image: "🍗",
  },
  {
    id: "meat-2",
    categoryId: 6,
    name: "Fresh Salmon",
    price: "₹450",
    image: "🐟",
  },
  {
    id: "meat-3",
    categoryId: 6,
    name: "Mutton Curry Cut",
    price: "₹520",
    image: "🥩",
  },
  // Bakery
  {
    id: "bakery-1",
    categoryId: 7,
    name: "Whole Wheat Bread",
    price: "₹45",
    image: "🍞",
  },
  {
    id: "bakery-2",
    categoryId: 7,
    name: "Blueberry Muffins",
    price: "₹150",
    image: "🧁",
  },
  {
    id: "bakery-3",
    categoryId: 7,
    name: "Garlic Breadsticks",
    price: "₹95",
    image: "🥖",
  },
  // Frozen
  {
    id: "frozen-1",
    categoryId: 8,
    name: "Frozen Peas 500g",
    price: "₹80",
    image: "🟢",
  },
  {
    id: "frozen-2",
    categoryId: 8,
    name: "Ice Cream Tub",
    price: "₹199",
    image: "🍨",
  },
  {
    id: "frozen-3",
    categoryId: 8,
    name: "Veggie Nuggets",
    price: "₹150",
    image: "🍢",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Fresh Bananas",
    price: "₹49",
    originalPrice: "₹69",
    discount: "29% OFF",
    image: "🍌",
  },
  {
    id: 2,
    name: "Organic Tomatoes",
    price: "₹39",
    originalPrice: "₹59",
    discount: "34% OFF",
    image: "🍅",
  },
  {
    id: 3,
    name: "Fresh Milk 1L",
    price: "₹58",
    originalPrice: "₹68",
    discount: "15% OFF",
    image: "🥛",
  },
  {
    id: 4,
    name: "Bread Loaf",
    price: "₹35",
    originalPrice: "₹45",
    discount: "22% OFF",
    image: "🍞",
  },
];

const bestSellers = [
  {
    id: 5,
    name: "Red Onions 1kg",
    price: "₹45",
    image: "🧅",
  },
  {
    id: 6,
    name: "Potatoes 1kg",
    price: "₹35",
    image: "🥔",
  },
  {
    id: 7,
    name: "Carrots 500g",
    price: "₹25",
    image: "🥕",
  },
  {
    id: 8,
    name: "Capsicum 500g",
    price: "₹55",
    image: "🫑",
  },
];

export default function HomeScreen() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id ?? null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId) {
      return categoryProducts;
    }
    return categoryProducts.filter((product) => product.categoryId === selectedCategoryId);
  }, [selectedCategoryId]);

  const handleCategoryPress = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setSidebarVisible(true);
  };

  return (
    <>
      <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} color="#00A859" />
          <View style={styles.locationTextContainer}>
            <Text style={styles.deliveryText}>Delivery in</Text>
            <Text style={styles.locationText}>Mumbai, 400001</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#333" />
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <FontAwesome name="shopping-cart" size={22} color="#333" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>0</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={18} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Quick Delivery Banner */}
      <View style={styles.deliveryBanner}>
        <View style={styles.deliveryBannerContent}>
          <MaterialIcons name="local-shipping" size={24} color="#00A859" />
          <View style={styles.deliveryBannerText}>
            <Text style={styles.deliveryBannerTitle}>10 minutes delivery</Text>
            <Text style={styles.deliveryBannerSubtitle}>Order now, get it fast!</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategoryId === category.id && styles.categoryCardActive,
                ]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <View style={styles.categoryIcon}>
                  <FontAwesome name={category.icon as any} size={24} color="#00A859" />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Deals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Deals</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          >
            {featuredProducts.map((product) => (
              <TouchableOpacity key={product.id} style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Text style={styles.productEmoji}>{product.image}</Text>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{product.discount}</Text>
                  </View>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                  </View>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Best Sellers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Sellers</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridContainer}>
            {bestSellers.map((product) => (
              <TouchableOpacity key={product.id} style={styles.gridProductCard}>
                <View style={styles.gridProductImageContainer}>
                  <Text style={styles.productEmoji}>{product.image}</Text>
                </View>
                <View style={styles.gridProductInfo}>
                  <Text style={styles.gridProductName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <View style={styles.gridPriceContainer}>
                    <Text style={styles.gridProductPrice}>{product.price}</Text>
                    <TouchableOpacity style={styles.gridAddButton}>
                      <FontAwesome name="plus" size={14} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Daily Essentials */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Essentials</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          >
            {featuredProducts.map((product) => (
              <TouchableOpacity key={`daily-${product.id}`} style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Text style={styles.productEmoji}>{product.image}</Text>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{product.discount}</Text>
                  </View>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                  </View>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      </SafeAreaView>

      <Modal visible={isSidebarVisible} animationType="slide" transparent>
        <View style={styles.fullscreenOverlay}>
          <SafeAreaView style={styles.fullscreenContainer}>
            <View style={styles.fullscreenHeader}>
              <Text style={styles.fullscreenTitle}>Browse Categories</Text>
              <TouchableOpacity style={styles.fullscreenCloseButton} onPress={() => setSidebarVisible(false)}>
                <FontAwesome name="close" size={22} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsContainer}
            >
              {categories.map((category) => {
                const isActive = selectedCategoryId === category.id;
                return (
                  <TouchableOpacity
                    key={`chip-${category.id}`}
                    onPress={() => setSelectedCategoryId(category.id)}
                    style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                  >
                    <View style={[styles.categoryChipIcon, isActive && styles.categoryChipIconActive]}>
                      <FontAwesome
                        name={category.icon as any}
                        size={18}
                        color={isActive ? "#FFFFFF" : "#00A859"}
                      />
                    </View>
                    <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <ScrollView contentContainerStyle={styles.fullGridContainer} showsVerticalScrollIndicator={false}>
              {filteredProducts.map((product) => (
                <View key={product.id} style={styles.fullGridCard}>
                  <View style={styles.fullGridImageContainer}>
                    <Text style={styles.fullGridEmoji}>{product.image}</Text>
                  </View>
                  <View style={styles.fullGridInfo}>
                    <Text style={styles.fullGridName} numberOfLines={2}>{product.name}</Text>
                    <View style={styles.fullGridFooter}>
                      <Text style={styles.fullGridPrice}>{product.price}</Text>
                      <TouchableOpacity style={styles.fullGridAddButton}>
                        <Text style={styles.fullGridAddText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
              {filteredProducts.length === 0 && (
                <View style={styles.emptyStateContainer}>
                  <Text style={styles.emptyStateText}>No items found for this category.</Text>
                </View>
              )}
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  deliveryText: {
    fontSize: 11,
    color: "#666",
    fontWeight: "400",
  },
  locationText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  cartButton: {
    position: "relative",
    padding: 8,
  },
  cartBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#00A859",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  deliveryBanner: {
    backgroundColor: "#E8F5E9",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  deliveryBannerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryBannerText: {
    marginLeft: 12,
    flex: 1,
  },
  deliveryBannerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00A859",
    marginBottom: 2,
  },
  deliveryBannerSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#00A859",
    fontWeight: "600",
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingRight: 8,
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 16,
    width: 70,
  },
  categoryCardActive: {
    opacity: 0.8,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F0F8F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
  productsContainer: {
    paddingHorizontal: 16,
    paddingRight: 8,
  },
  productCard: {
    width: 160,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    overflow: "hidden",
  },
  productImageContainer: {
    width: "100%",
    height: 140,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  productEmoji: {
    fontSize: 60,
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FF4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    minHeight: 36,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  addButton: {
    backgroundColor: "#00A859",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  gridProductCard: {
    width: (width - 48) / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    overflow: "hidden",
  },
  gridProductImageContainer: {
    width: "100%",
    height: 120,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
  gridProductInfo: {
    padding: 12,
  },
  gridProductName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    minHeight: 32,
  },
  gridPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gridProductPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },
  gridAddButton: {
    backgroundColor: "#00A859",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenOverlay: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  fullscreenHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  fullscreenTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#333",
  },
  fullscreenCloseButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },
  chipsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#00A859",
  },
  categoryChipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  categoryChipIconActive: {
    backgroundColor: "#00A859",
  },
  categoryChipText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "700",
  },
  categoryChipTextActive: {
    color: "#00A859",
  },
  fullGridContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  fullGridCard: {
    width: (width - 48) / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    marginBottom: 16,
    overflow: "hidden",
  },
  fullGridImageContainer: {
    width: "100%",
    height: 160,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
  fullGridEmoji: {
    fontSize: 80,
  },
  fullGridInfo: {
    padding: 12,
  },
  fullGridName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
    minHeight: 40,
    marginBottom: 10,
  },
  fullGridFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fullGridPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#333",
  },
  fullGridAddButton: {
    backgroundColor: "#00A859",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  fullGridAddText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  emptyStateContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 14,
    color: "#666",
  },
});

