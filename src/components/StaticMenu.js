import React, { useState, useEffect } from 'react';
import './css/hovermenu.css';

const StaticMenu = ({links}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 567);

  


  // reactのmaterial UI、アニメーション用のライブラリをreactで。

  useEffect(() => {
    let timeoutId;

  const handleResize = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(()=>{
      setIsMobile(window.innerWidth <= 567);
    }, 100)
  };
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(timeoutId)
  };
}, []);

  const handleLogout = async () => {
    // try {
    //   await axios.post(`${API_URL}/api/logout/`, null, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-CSRFToken': document.cookie.match(/csrftoken=([^;]*)/)?.[1], // CSRFトークンを取得
    //     },
    //     withCredentials: true, // クッキーを送信
    //   });
      
      localStorage.removeItem('current-token');
      localStorage.removeItem('username');
      window.location.href = '/';
    // } catch (error) {
    //   console.error('ログアウトエラー:', error);
    // }
  };
  
  return (
    <div
      id="hoverMenu"
      style={ isMobile ? {} : { width: `100px` }
        // width: `${menuWidth}px`,
        // height: '100vh',
        // position: 'fixed',
        // top: 0,
        // left: 0,
        // backgroundColor: '#333',
        // color: 'white',
        // overflow: 'hidden',
        // transition: 'width 0.3s ease',
      }
    >

      <a href="/main" >TOP</a>
      <a href={links.href} >{links.text}</a>

      <button className='LogoutButton' onClick={handleLogout} style={{
        backgroundColor: 'transparent',
        color: 'rgba(15, 115, 230, 1)',
        border: 'none',
        cursor: 'pointer',
      }}aria-label="ログアウト">LOG OUT</button>

    </div>
  );
};

export default StaticMenu;