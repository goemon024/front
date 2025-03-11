import React, { useState } from "react";
import './css/tagButton.css';

const TagButton = ({ text, link, top, color, backgroundColor, logout = false, width = "10%" }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault(); // デフォルトのリンク遷移を防止
        localStorage.removeItem('current-token');
        localStorage.removeItem('username');
        window.location.href = '/';
    };

    const handleClick = (e) => {
        if (logout) {
            handleLogout(e);
        }
        // logoutがfalseの場合は通常のリンク遷移が発生
    };

    // 三角形のスタイル
    const triangleStyle = {
        position: 'absolute',
        left: '-20px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '32px 20px 32px 0',
        borderColor: `transparent ${backgroundColor} transparent transparent`,
        transition: 'all 0.3s ease',
        opacity: isHovered ? 0.8 : 1
    };

    // ボタンのスタイル
    const buttonStyle = {
        top: top,
        backgroundColor: backgroundColor,
        color: color
    };

    return (
        <a
            href={logout ? "#" : link}  // ログアウト時は無効なリンクに
            className={`tag-button ${isHovered ? "hovered" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={buttonStyle}
            onClick={handleClick}
        >
            <div style={triangleStyle} />
            {text}
        </a>
    );
};

export default TagButton;