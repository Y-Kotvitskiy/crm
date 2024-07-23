import { createSlice } from "@reduxjs/toolkit";

const calcTotal = (items) =>
  Object.keys(items).reduce(
    (accumulator, currentId) => accumulator + items[currentId].qty,
    0
  );

const initialState = {
  items: {},
  total: 0,
};
export const productCardSlice = createSlice({
  name: "productCard",
  initialState,
  reducers: {
    increment: (state, { payload: { id, title } }) => {
    const items = state.items; 
      items[id] = items[id]
        ? {...items[id], qty : items[id].qty + 1}  
        : { title, qty: 1 };
      state.total = calcTotal(state.items);
    },
    decrement: (state, { payload: { id } }) => {
      if (state.items[id]) state.items[id] -= 1;
      state.total = calcTotal(state.items);
    },
    deleteItem: (state, { payload: { id } }) => {
      if (state.items[id]) delete state.items[id];
      state.total = calcTotal(state.items);
    },
  },
});

export const { increment, decrement, deleteItem } = productCardSlice.actions;

export default productCardSlice.reducer;
