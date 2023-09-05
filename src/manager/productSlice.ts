import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { home } from "../models/home";

export const getProducts = createAsyncThunk("getProducts", async () => {
    const response = await fetch("/home.json");
    const json = await response.json();
    return json;
});

const initialState: { data?: home } = {

}

const productSlide = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProductToBascet: (state, action: PayloadAction<number>) => {
            if (state.data) {
                state.data = {
                    ...state.data,
                    products: state.data.products.map((item) => {
                        if (item.id === action.payload)
                            return { ...item, count: item.count !== undefined ? item.count + 1 : 1 }
                        return item
                    })
                }
            }
        },
        removeProductFromBascet: (state, action: PayloadAction<number>) => {
            if (state.data) {
                state.data = {
                    ...state.data,
                    products: state.data.products.map((item) => {
                        if (item.id === action.payload)
                            return { ...item, count: item.count !== undefined && item.count > 0 ? item.count - 1 : 0 }
                        return item
                    })
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
});

export const { addProductToBascet, removeProductFromBascet } = productSlide.actions;
export default productSlide.reducer;