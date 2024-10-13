import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2 className="logo-text">Shop Name</h2>
                    <p>
                        Chúng tôi cung cấp các sản phẩm chất lượng cao với giá cả hợp lý. 
                        Sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi.
                    </p>
                    <div className="contact">
                        <span><Phone size={20} /> &nbsp; 123-456-789</span>
                        <span><Mail size={20} /> &nbsp; info@shopname.com</span>
                        <span><MapPin size={20} /> &nbsp; 123 Đường ABC, Thành phố XYZ</span>
                    </div>
                    <div className="socials">
                        <a href="#"><Facebook /></a>
                        <a href="#"><Twitter /></a>
                        <a href="#"><Instagram /></a>
                    </div>
                </div>
                <div className="footer-section links">
                    <h2>Liên kết nhanh</h2>
                    <ul>
                        <li><a href="#">Trang chủ</a></li>
                        <li><a href="#">Sản phẩm</a></li>
                        <li><a href="#">Về chúng tôi</a></li>
                        <li><a href="#">Điều khoản dịch vụ</a></li>
                        <li><a href="#">Chính sách bảo mật</a></li>
                    </ul>
                </div>
                <div className="footer-section contact-form">
                    <h2>Liên hệ với chúng tôi</h2>
                    <form>
                        <input type="email" name="email" className="text-input contact-input" placeholder="Địa chỉ email của bạn..." />
                        <textarea name="message" className="text-input contact-input" placeholder="Tin nhắn của bạn..."></textarea>
                        <button type="submit" className="btn btn-big contact-btn">
                            Gửi
                        </button>
                    </form>
                </div>
                
            </div>
            <div className="footer-bottom">
                &copy; 2023 ShopName.com | Thiết kế bởi YourName
            </div>
        </footer>
    );
};

export default Footer;