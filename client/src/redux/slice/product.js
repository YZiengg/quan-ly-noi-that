import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name:'product',
    initialState:{
        products:[],
        success: false,
        isfetching:false,
        error: false
    },

    reducers:{

        createProductSuccess: (state)=>{
            state.isfetching = false
            state.success = true
        },

        getProductsSuccess:(state,action)=>{
            state.isfetching = false
            state.products = action.payload
        }
        
    }
});

export const{
    createProductSuccess,
    getProductsSuccess
} = categorySlice.actions

export default categorySlice.reducer