import {v4 as uuidv4} from "uuid"
const API_PATH = {
    //authentication
    SENT_OTP:"/otp/sent-otp",
    CHECK_OTP:"/otp/check-otp",
    REG_ACC: "/auth/reg",
    LOGIN: "/auth/login",
    //category
    GET_CAT:"/cat/get",
    CREATE_CAT: "/cat/create",
    DELETE_CAT:"/cat/:categoryId",
    //product
    GET_PROD:"/prod/get",
    GET_PROD_CAT_ID:"/prod/:categoryId",
    CREATE_PROD:"/prod/create",
    DELETE_PROD:"/prod/:categoryId/:productId",
    GET_PROD_DETAIL:"/prod-detail/:productId",
    //shopping cart
    GET_SHOPPINGCART:"/shopping/",
    ADD_TO_SHOPPINGCART:"/shopping/add",
    REMOVE_ITEM_CART:"/shopping/:itemId",
    //order
    GET_ORDERS:"/order/:status",
    CREATE_ORDER:"/order/create",
    UPDATE_STATUS_ORDER:"/order/update",
    REMOVE_ORDER:"/order/:orderId",
    //uplaod
    UPLOAD_IMAGE:"/upload/images",

};

const STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};

const DB_SCHEMA = {
    OTP: 'Otp',
    ACCOUNT: 'Account',
    USER: 'User',
    BRAND:'Brand',
    CATEGORY:'Category',
    PRODUCT:'Product',
    SHOPINGCART:'ShoppingCart',
    ORDER: 'Order'
};


const createRandomID = ()=>{
    return uuidv4();
}
export  { API_PATH, STATUS, DB_SCHEMA , createRandomID};
