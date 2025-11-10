import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productsAPI } from "../../utils/api";
import type { RootState } from "../store";

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discountLabel?: string;
  image?: string;
  categoryId: string;
  tags?: string[];
};

type FetchProductsResponse = {
  success: boolean;
  data?: {
    categories?: Category[];
    products?: Product[];
    featured?: Product[];
    bestSellers?: Product[];
  };
};

type ProductsState = {
  categories: Category[];
  products: Product[];
  featured: Product[];
  bestSellers: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductsState = {
  categories: [],
  products: [],
  featured: [],
  bestSellers: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, thunkAPI) => {
  try {
    const response: FetchProductsResponse = await productsAPI.getAll();

    if (!response?.success) {
      throw new Error("Unable to load products right now.");
    }

    return response.data ?? {};
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.message ?? "Unable to load products right now.");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const data = action.payload ?? {};
        state.categories = data.categories ?? [];
        state.products = data.products ?? [];
        state.featured = data.featured ?? [];
        state.bestSellers = data.bestSellers ?? [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? action.error.message ?? "Something went wrong.";
      });
  },
});

export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectAllProducts = (state: RootState) => state.products.products;
export const selectFeaturedProducts = (state: RootState) => state.products.featured;
export const selectBestSellers = (state: RootState) => state.products.bestSellers;
export const selectDailyEssentials = (state: RootState) =>
  state.products.products.slice(0, Math.min(10, state.products.products.length));

export default productsSlice.reducer;


