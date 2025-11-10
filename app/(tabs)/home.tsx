import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  fetchProducts,
  selectAllProducts,
  selectBestSellers,
  selectCategories,
  selectDailyEssentials,
  selectFeaturedProducts,
  selectProductsError,
  selectProductsStatus,
  type Category,
  type Product,
} from "../state/slices/productsSlice";
import { addToCart, selectCartTotalQuantity } from "../state/slices/cartSlice";

const { width } = Dimensions.get("window");

const formatCurrency = (value?: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "";
  }
  return `₹${Math.round(value)}`;
};

const getProductEmoji = (image?: string) => {
  if (!image || image.trim().length === 0) {
    return "🛒";
  }
  return image;
};

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const categories = useAppSelector(selectCategories);
  const allProducts = useAppSelector(selectAllProducts);
  const featuredFromState = useAppSelector(selectFeaturedProducts);
  const bestSellersFromState = useAppSelector(selectBestSellers);
  const dailyEssentialsFromState = useAppSelector(selectDailyEssentials);
  const cartQuantity = useAppSelector(selectCartTotalQuantity);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const loadingProducts = status === "loading";

  const featuredProducts = useMemo(() => {
    if (featuredFromState.length > 0) {
      return featuredFromState;
    }
    return allProducts.slice(0, Math.min(8, allProducts.length));
  }, [featuredFromState, allProducts]);

  const bestSellers = useMemo(() => {
    if (bestSellersFromState.length > 0) {
      return bestSellersFromState;
    }
    return allProducts.slice(0, Math.min(8, allProducts.length));
  }, [bestSellersFromState, allProducts]);

  const dailyEssentials = useMemo(() => {
    if (dailyEssentialsFromState.length > 0) {
      return dailyEssentialsFromState;
    }
    return allProducts.slice(0, Math.min(10, allProducts.length));
  }, [dailyEssentialsFromState, allProducts]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      setSelectedCategoryId(null);
      return;
    }

    setSelectedCategoryId((prev) => {
      if (prev && categories.some((category) => category.id === prev)) {
        return prev;
      }
      return categories[0].id;
    });
  }, [categories]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId) {
      return allProducts;
    }
    return allProducts.filter((product) => product.categoryId === selectedCategoryId);
  }, [allProducts, selectedCategoryId]);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSidebarVisible(true);
  };

  const handleChipPress = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
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
              <Text style={styles.cartBadgeText}>{cartQuantity}</Text>
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

        {error && !loadingProducts && (
          <View style={styles.errorAlert}>
            <MaterialIcons name="error-outline" size={18} color="#FF3B30" style={styles.errorIcon} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
            {loadingProducts ? (
              <View style={styles.categoryLoadingContainer}>
                <ActivityIndicator size="small" color="#00A859" />
              </View>
            ) : categories.length === 0 ? (
              <Text style={styles.inlineEmptyText}>No categories available right now.</Text>
            ) : (
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
            )}
          </View>

          {/* Featured Deals */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Deals</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {loadingProducts ? (
              <View style={styles.horizontalLoader}>
                <ActivityIndicator size="small" color="#00A859" />
              </View>
            ) : featuredProducts.length === 0 ? (
              <Text style={styles.inlineEmptyText}>No featured products yet.</Text>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsContainer}
              >
                {featuredProducts.map((product) => (
                  <TouchableOpacity key={product.id} style={styles.productCard}>
                    <View style={styles.productImageContainer}>
                      <Text style={styles.productEmoji}>{getProductEmoji(product.image)}</Text>
                      {product.discountLabel ? (
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountText}>{product.discountLabel}</Text>
                        </View>
                      ) : null}
                    </View>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <View style={styles.priceContainer}>
                        <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
                        {product.originalPrice ? (
                          <Text style={styles.originalPrice}>{formatCurrency(product.originalPrice)}</Text>
                        ) : null}
                      </View>
                      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(product)}>
                        <Text style={styles.addButtonText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Best Sellers */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Best Sellers</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {loadingProducts ? (
              <View style={styles.horizontalLoader}>
                <ActivityIndicator size="small" color="#00A859" />
              </View>
            ) : bestSellers.length === 0 ? (
              <Text style={styles.inlineEmptyText}>No best sellers yet.</Text>
            ) : (
              <View style={styles.gridContainer}>
                {bestSellers.map((product) => (
                  <TouchableOpacity key={product.id} style={styles.gridProductCard}>
                    <View style={styles.gridProductImageContainer}>
                      <Text style={styles.productEmoji}>{getProductEmoji(product.image)}</Text>
                    </View>
                    <View style={styles.gridProductInfo}>
                      <Text style={styles.gridProductName} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <View style={styles.gridPriceContainer}>
                        <Text style={styles.gridProductPrice}>{formatCurrency(product.price)}</Text>
                        <TouchableOpacity style={styles.gridAddButton} onPress={() => handleAddToCart(product)}>
                          <FontAwesome name="plus" size={14} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Daily Essentials */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Daily Essentials</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {loadingProducts ? (
              <View style={styles.horizontalLoader}>
                <ActivityIndicator size="small" color="#00A859" />
              </View>
            ) : dailyEssentials.length === 0 ? (
              <Text style={styles.inlineEmptyText}>No daily essentials yet.</Text>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsContainer}
              >
                {dailyEssentials.map((product) => (
                  <TouchableOpacity key={`daily-${product.id}`} style={styles.productCard}>
                    <View style={styles.productImageContainer}>
                      <Text style={styles.productEmoji}>{getProductEmoji(product.image)}</Text>
                      {product.discountLabel ? (
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountText}>{product.discountLabel}</Text>
                        </View>
                      ) : null}
                    </View>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <View style={styles.priceContainer}>
                        <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
                        {product.originalPrice ? (
                          <Text style={styles.originalPrice}>{formatCurrency(product.originalPrice)}</Text>
                        ) : null}
                      </View>
                      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(product)}>
                        <Text style={styles.addButtonText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal visible={isSidebarVisible} animationType="slide" transparent>
        <View style={styles.fullscreenOverlay}>
          <SafeAreaView style={styles.fullscreenContainer}>
            <View style={styles.fullscreenHeader}>
              <Text style={styles.fullscreenTitle}>Browse Categories</Text>
              <TouchableOpacity
                style={styles.fullscreenCloseButton}
                onPress={() => setSidebarVisible(false)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                accessibilityRole="button"
                accessibilityLabel="Close categories"
              >
                <FontAwesome name="close" size={22} color="#333" />
              </TouchableOpacity>
            </View>

            {loadingProducts ? (
              <View style={styles.modalLoadingContainer}>
                <ActivityIndicator size="large" color="#00A859" />
              </View>
            ) : categories.length === 0 ? (
              <View style={styles.modalLoadingContainer}>
                <Text style={styles.emptyStateText}>No categories available.</Text>
              </View>
            ) : (
              <>
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
                        onPress={() => handleChipPress(category.id)}
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
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <View key={product.id} style={styles.fullGridCard}>
                        <View style={styles.fullGridImageContainer}>
                          <Text style={styles.fullGridEmoji}>{getProductEmoji(product.image)}</Text>
                        </View>
                        <View style={styles.fullGridInfo}>
                          <Text style={styles.fullGridName} numberOfLines={2}>
                            {product.name}
                          </Text>
                          <View style={styles.fullGridFooter}>
                            <View>
                              <Text style={styles.fullGridPrice}>{formatCurrency(product.price)}</Text>
                              {product.originalPrice ? (
                                <Text style={styles.fullGridOriginalPrice}>
                                  {formatCurrency(product.originalPrice)}
                                </Text>
                              ) : null}
                            </View>
                            <TouchableOpacity
                              style={styles.fullGridAddButton}
                              onPress={() => handleAddToCart(product)}
                            >
                              <Text style={styles.fullGridAddText}>Add</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))
                  ) : (
                    <View style={styles.emptyStateContainer}>
                      <Text style={styles.emptyStateText}>No items found for this category.</Text>
                    </View>
                  )}
                </ScrollView>
              </>
            )}
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
  errorAlert: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#FFECEF",
    borderWidth: 1,
    borderColor: "#FFD0D5",
  },
  errorIcon: {
    marginRight: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: "#C62828",
    fontWeight: "600",
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
  categoryLoadingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
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
  inlineEmptyText: {
    paddingHorizontal: 16,
    fontSize: 13,
    color: "#666",
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
  horizontalLoader: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: "center",
    alignItems: "center",
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
    zIndex: 2,
  },
  fullscreenTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#333",
  },
  fullscreenCloseButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
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
  fullGridOriginalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
    marginTop: 4,
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
  modalLoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

