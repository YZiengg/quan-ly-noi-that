import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './productdetail.css';
import { ShoppingCart } from 'lucide-react';
import QuantityControl from './QuantityControl';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../../../api/API_Product';

const ProductDetail = () => {
    const { productId } = useParams();
    const initialProdDetail = useSelector((state) => state.products.productDetail);
    const dispatch = useDispatch();
    const [product, setProduct] = useState(initialProdDetail);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        getProductDetail(dispatch, productId);
    }, [productId, dispatch]);

    useEffect(() => {
        if (initialProdDetail) {
            setProduct(initialProdDetail);
        }
    }, [initialProdDetail]);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 0) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        // Logic thêm sản phẩm vào giỏ hàng
        console.log('Sản phẩm đã được thêm vào giỏ hàng',quantity,product._id);
    };

    const handleBuyNow = () => {
        // Logic mua ngay
        console.log('Đã chọn mua ngay');
    };

    if (!product || Object.keys(product).length === 0) {
        return <div>Loading...</div>;
    }
        
    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <div className="product-img">
                    <img src={product?.images[0]?.url} alt={product?.product_name} className="product-image" />
                </div>
                <div className="product-content">
                    <div className="product-info">
                        <div className="product-name">
                            {product?.product_name}
                        </div>
                        <div className="product-price">
                            {product?.price.toLocaleString()} đ
                        </div>
                        <div className="product-description">
                            {product?.description}
                        </div>

                        <QuantityControl quantity={quantity} onQuantityChange={handleQuantityChange} />
                    </div>
                    <div className="product-actions">
                        <div className="add-product-cart">
                            <ShoppingCart size={30} />
                            <button onClick={handleAddToCart} className="btn-add-to-cart">Thêm vào giỏ hàng</button>
                        </div>
                        <div className="buy-now">
                            <button onClick={handleBuyNow} className="btn-buy-now">Mua ngay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
