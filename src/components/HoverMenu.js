import React, { useState, useEffect } from 'react';
import './css/hovermenu.css';
import LogoutButton from './LogoutButton';
import { throttle, debounce } from 'lodash';

const HoverMenu = ({links}) => {
  const [menuWidth, setMenuWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 567);
  // reactのmaterial UI、アニメーション用のライブラリをreactで。

  useEffect(() => {
    // const handleMouseMove = (e) => {
    //   if (e.clientX < 100) {
    //     setMenuWidth(100); // メニューを表示
    //   } else {
    //     setMenuWidth(0); // メニューを非表示
    //   }
    // };

    const handleMouseMove = throttle((e) => {
      setMenuWidth(e.clientX < 100 ? 100 : 0);
    }, 100); // 100ms間隔で実行

    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth <= 567);
    }, 150); 


  if (!isMobile) {
    window.addEventListener('mousemove', handleMouseMove);
  }

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
  };
}, []);
  
  return (
    <div
      id="hoverMenu"
      style={ isMobile ? {} : { width: `${menuWidth}px` }
      }>

      <a href="/main" >TOP</a>
      <a href={links.href} >{links.text}</a>
      <LogoutButton />

    </div>
  );
};

export default HoverMenu;