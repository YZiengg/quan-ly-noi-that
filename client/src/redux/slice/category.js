import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name:'category',
    initialState:{
        categories:[],
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
        }
        
    }
});

export const{
    createCategorySuccess,
    getCategoriesSuccess
} = categorySlice.actions

export default categorySlice.reducer