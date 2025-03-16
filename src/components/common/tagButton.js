import React, { useState } from 'react';
import './css/tagButton.css';

const TagButton = ({
    text,
    link,
    top,
    color,
    backgroundColor,
    logout = false,
    width = '22.5rem',
}) => {
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

    const calcTop = (top) => {
        if (text === "Logout") {
            return "90%";
        }
        const numericalTop = parseInt(top);
        return `${numericalTop + 45}%`;
    }

    // カスタムスタイルを作成
    const buttonStyle = {
        backgroundColor: backgroundColor,
        color: color,
        '--triangle-color': backgroundColor,

        '--top': top,
        '--responsive-top': calcTop(top),
        '--width': width,
        '--responsive-width': '250px'
    };

    return (
        <a
            href={logout ? '#' : link} // ログアウト時は無効なリンクに
            className={`tag-button ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={buttonStyle}
            onClick={handleClick}
        >
            {text}
            <span className="tag-triangle"></span>
        </a>
    );
};

export default TagButton;
