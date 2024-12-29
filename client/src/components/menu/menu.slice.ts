import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Menu {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface MenuState {
  menuList: Menu[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menuList: [],
  loading: false,
  error: null,
};

// Define the async thunk to fetch menu data from the backend
export const fetchMenuData = createAsyncThunk<Menu[]>(
  'hello',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menuitem');
      return response.data;
    } catch (error) {
        console.log(error)
      throw Error('Failed to fetch menu data');
    }
  }
);

// Create the slice
const menuSlice = createSlice({
  name: 'holy',
  initialState,
  reducers: {
    // Sync reducers for local state
    // addMenuItem(state, action: PayloadAction<Menu>) {
    //   state.menuList.push(action.payload);
    // },
    // removeMenuItem(state, action: PayloadAction<number>) {
    //   state.menuList = state.menuList.filter(menu => menu.id !== action.payload);
    // },
    // updateMenuItem(state, action: PayloadAction<Menu>) {
    //   const index = state.menuList.findIndex(menu => menu.id === action.payload.id);
    //   if (index !== -1) {
    //     state.menuList[index] = action.payload;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuData.fulfilled, (state, action: PayloadAction<Menu[]>) => {
        state.loading = false;
        state.menuList = action.payload;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch menu data';
      });
  },
});

// export const { addMenuItem, removeMenuItem, updateMenuItem } = menuSlice.actions;

const menuReducer = menuSlice.reducer;

export default menuReducer;
