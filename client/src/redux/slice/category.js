import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name:'category',
    initialState:{
        categories:[],
        products:[],
        success: false,
        isfetching:false,
        error: false
    },

    reducers:{

        createCategorySuccess: (state)=>{
            state.isfetching = false
            state.success = true
        },

        getCategoriesSuccess:(state,action)=>{
            state.isfetching = false
            state.categories = action.payload
        },
        getProductByCategorySuccess:(state,action)=>{
            state.isfetching = false
            state.products = action.payload
        },
        
    }
});

export const{
    createCategorySuccess,
    getCategoriesSuccess,
    getProductByCategorySuccess
} = categorySlice.actions

export default categorySlice.reducer