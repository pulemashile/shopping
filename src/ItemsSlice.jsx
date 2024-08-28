import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    list: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.list.push(action.payload);
    },
    removeItem: (state, action) => {
      state.list = state.list.filter(item => item.id !== action.payload);
    },
    updateItem: (state, action) => {
      const { id, updatedItem } = action.payload;
      const index = state.list.findIndex(item => item.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updatedItem };
      }
    },
  },
});

export const { addItem, removeItem, updateItem } = itemsSlice.actions;
export default itemsSlice.reducer;
