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
      // Check if action.payload is already the item or if it contains id and updatedItem
      const itemToUpdate = action.payload.updatedItem ? action.payload.updatedItem : action.payload;
      const itemId = action.payload.id || itemToUpdate.id;
      
      const index = state.list.findIndex(item => item.id === itemId);
      if (index !== -1) {
        state.list[index] = { 
          ...state.list[index], 
          ...itemToUpdate,
          id: itemId  // Ensure ID doesn't change
        };
      }
    },
  },
});

export const { addItem, removeItem, updateItem } = itemsSlice.actions;
export default itemsSlice.reducer;