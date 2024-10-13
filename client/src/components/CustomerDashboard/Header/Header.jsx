// src/components/CustomerDashboard/Header/Header.jsx
import React, { useState } from 'react';
import { Search, ShoppingCart, LogOut } from 'lucide-react';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const initialAccount = useSelector((state)=> state.auth?.account);
    const initialuser = initialAccount?.user;
   
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

   

    return (
        <div className="header-container">
            <div className='top-header'>
                <div className='user-section'>
                    {initialuser ? (
                        <div className='user-info'>
                            <span>{initialuser?.user_name}</span>
                            <button onClick={handleLogout} className='logout-button'>
                                <LogOut size={15} />
                            </button>
                        </div>
                    ) : (
                        <div className='login' onClick={()=> navigate('/login')}>
                            <span>Đăng Nhập</span>
                        </div>
                    )}
                </div>
            </div>

            <div className='header-content'>
                <div className='logo'>
                    <img src="/images/logo-01-01-1024x355.png" alt="logo" />
                </div>
                <nav className='nav'>
                    <ul>
                        <li className='nav-item'><a href="/">Trang Chủ</a></li>
                        <li className='nav-item'><a href="/store">Cửa Hàng</a></li>
                        <li className='nav-item'><a href="/product">Sản Phẩm</a></li>
                        <li className='nav-item'><a href="post">Bài Viết</a></li>
                        <li className='nav-item'><a href="me">Liên Hệ Chúng Tôi</a></li>
                    </ul>
                </nav>

                <div className="search">
                    <form onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                    <button type="submit"><Search size={16} /></button>
                </div>

                <div className="cart">
                   <ShoppingCart size={25} />
                </div>
            </div>

           
        </div>
    );
};

export default Header;
