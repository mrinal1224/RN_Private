import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from "../state/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";

const formatCurrency = (value?: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "₹0";
  }
  return `₹${value.toFixed(2)}`;
};

const getProductEmoji = (image?: string) => {
  if (!image || image.trim().length === 0) {
    return "🛒";
  }
  return image;
};

export default function StoreScreen() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    Alert.alert("Checkout", "This is a demo checkout flow. Implement payment here.");
  };

  const handleClearCart = () => {
    Alert.alert("Clear cart", "Remove all items from your cart?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: () => dispatch(clearCart()) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Cart</Text>
          <Text style={styles.headerSubtitle}>
            {totalQuantity === 0 ? "No items yet." : `${totalQuantity} item${totalQuantity > 1 ? "s" : ""} in cart`}
          </Text>
        </View>
        {cartItems.length > 0 ? (
          <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🛍️</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Browse the home tab and add items to begin checkout.</Text>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItemCard}>
                <View style={styles.cartItemEmojiContainer}>
                  <Text style={styles.cartItemEmoji}>{getProductEmoji(item.image)}</Text>
                </View>
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  {item.description ? (
                    <Text style={styles.cartItemDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                  ) : null}
                  <View style={styles.cartItemFooter}>
                    <Text style={styles.cartItemPrice}>{formatCurrency(item.price * item.quantity)}</Text>
                    <View style={styles.quantityController}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => dispatch(decrementQuantity(item.id))}
                      >
                        <FontAwesome name="minus" size={14} color="#333" />
                      </TouchableOpacity>
                      <Text style={styles.quantityLabel}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => dispatch(incrementQuantity(item.id))}
                      >
                        <FontAwesome name="plus" size={14} color="#333" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.checkoutBar}>
            <View>
              <Text style={styles.checkoutLabel}>Total ({totalQuantity} item{totalQuantity > 1 ? "s" : ""})</Text>
              <Text style={styles.checkoutAmount}>{formatCurrency(totalPrice)}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.checkoutButton,
                cartItems.length === 0 && styles.checkoutButtonDisabled,
              ]}
              disabled={cartItems.length === 0}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },
  clearButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "#FFEDEF",
  },
  clearButtonText: {
    color: "#FF3B30",
    fontWeight: "600",
    fontSize: 13,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 74,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  cartItemCard: {
    flexDirection: "row",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cartItemEmojiContainer: {
    width: 68,
    height: 68,
    borderRadius: 16,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cartItemEmoji: {
    fontSize: 38,
  },
  cartItemInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2F2F2F",
    marginBottom: 4,
  },
  cartItemDescription: {
    fontSize: 13,
    color: "#777",
    marginBottom: 10,
  },
  cartItemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartItemPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F1F1F",
  },
  quantityController: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityLabel: {
    marginHorizontal: 12,
    fontSize: 15,
    fontWeight: "700",
    color: "#2B2B2B",
  },
  checkoutBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  checkoutLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  checkoutAmount: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  checkoutButton: {
    backgroundColor: "#00A859",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
  },
  checkoutButtonDisabled: {
    backgroundColor: "#BDBDBD",
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

