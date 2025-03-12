import React from 'react';

const LogoutButton = ({ style, label = 'LOG OUT' }) => {
  const handleLogout = async () => {
    localStorage.removeItem('current-token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  return (
    <button
      className="LogoutButton"
      onClick={handleLogout}
      style={{
        backgroundColor: 'transparent',
        color: 'rgba(15, 115, 230, 1)',
        border: 'none',
        cursor: 'pointer',
        ...style, // 追加のスタイルを上書き可能
      }}
      aria-label="ログアウト"
    >
      {label}
    </button>
  );
};

export default LogoutButton;
