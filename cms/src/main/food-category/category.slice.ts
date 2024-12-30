import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
import { TCategory } from "@/types/category.type";

interface CategoryState {
  categoryList: TCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categoryList: [],
  loading: false,
  error: null,
};

export const fetchCategoryData = createAsyncThunk<TCategory[]>(
  "/api/fetchCategory",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/category");
      return response.data;
    } catch (error) {
      console.log(error);
      throw Error("Failed to category  data");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategoryData.fulfilled,
        (state, action: PayloadAction<TCategory[]>) => {
          state.loading = false;
          state.categoryList = action.payload;
        }
      )
      .addCase(fetchCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch menu data";
      });
  },
});

const categoryReducer = categorySlice.reducer;

export default categoryReducer;
