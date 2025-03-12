import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './css/tagButton.module.css';

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

  const handleLogout = useCallback((e) => {
    e.preventDefault();
    localStorage.removeItem('current-token');
    localStorage.removeItem('username');
    window.location.href = '/';
  }, []);

  const handleClick = useCallback(
    (e) => {
      if (logout) {
        handleLogout(e);
      }
    },
    [logout, handleLogout]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const buttonStyle = {
    top,
    backgroundColor,
    color,
    width: `clamp(120px, ${width}, 350px)`,
    '--triangle-color': backgroundColor,
  };

  return (
    <a
      href={logout ? '#' : link}
      className={`${styles.tagButton} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={buttonStyle}
      onClick={handleClick}
    >
      {text}
      <span className={styles.tagTriangle} />
    </a>
  );
};

TagButton.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  top: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  logout: PropTypes.bool,
  width: PropTypes.string,
};

TagButton.defaultProps = {
  top: 'auto',
  color: '#ffffff',
  backgroundColor: '#000000',
  logout: false,
  width: '22.5rem',
};

export default TagButton;
