import React, { useState, useEffect } from 'react';
import './css/flashcard.css';

const FlashCard = ({ cardData })  => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
  
    const slideToNextCard = () => {
      if (isAnimating) return; // アニメーション中は次のカードに移動しない
      setIsAnimating(true);
      const nextIndex = (currentIndex + 1) % cardData.length;
      setCurrentIndex(nextIndex);
  
      setTimeout(() => {
        setIsAnimating(false); // アニメーションが終わったらフラグをリセット
      }, 400); // アニメーション時間と一致させる
    };

    return (
        <div className="flashcard-container" onClick={slideToNextCard}>
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`flashcard ${index === currentIndex ? 'active' : 'hidden'}`}
          >
            {card.memo}
          </div>
        ))}
      </div>
    );
}

export default FlashCard
