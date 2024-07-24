import { createSlice } from "@reduxjs/toolkit";

const calcTotal = (state) => {
  const items = state.items;
  state.totalCount = Object.keys(items).reduce(
    (accumulator, currentId) => accumulator + items[currentId].qty,
    0
  );
  state.totalSum = Object.keys(items).reduce(
    (accumulator, currentId) =>
      accumulator + items[currentId].qty * items[currentId].pizza.price,
    0
  );
};

const initialState = {
  items: {},
  total: 0,
};
export const productCardSlice = createSlice({
  name: "productCard",
  initialState,
  reducers: {
    increment: (state, { payload: { id, pizza } }) => {
      const items = state.items;
      items[id] = items[id]
        ? { ...items[id], qty: items[id].qty + 1 }
        : { pizza, qty: 1 };
      calcTotal(state);
    },
    decrement: (state, { payload: { id } }) => {
      if (state.items[id].qty === 1) {
        delete state.items[id];
      } else {
        state.items[id].qty -= 1;
      }
      calcTotal(state);
    },
    deleteItem: (state, { payload: { id } }) => {
      if (state.items[id]) delete state.items[id];
      calcTotal(state);
    },
    clearCard(state) {
      state.items = {};
      calcTotal(state);
    },
  },
});

export const { increment, decrement, deleteItem, clearCard } = productCardSlice.actions;

export default productCardSlice.reducer;
