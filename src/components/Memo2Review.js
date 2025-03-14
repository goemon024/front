import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

// import axios from 'axios'

// import { useCookies } from 'react-cookie';          // useCookiesを使う

import './css/flashcard.css';
import FlashMemo2 from './FlashMemo2';
import HoverMenu from './HoverMenu';
// import './css/list.css';

const Memo2Review = () => {
  // const today    = dayjs().format('YYYY-MM-DD');
  // const agoDay1  = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  // const agoDay7  = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
  // const agoDay28 = dayjs().subtract(28, 'day').format('YYYY-MM-DD');

  const { memo2Table, loading } = useContext(DataContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  // const filteredData = memo2Table.filter(data =>
  //   [today,agoDay1,agoDay7,agoDay28].includes(data.reg_date));

  const filteredData = memo2Table;

  function shuffleArray(array) {
    const newArray = [...array]; // 元の配列をコピー
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // 要素を交換
    }
    return newArray;
  }

  return (
    <div>
      <FlashMemo2 cardData={shuffleArray(filteredData)} />
      <HoverMenu
        menuLink={{ href: '/memo2', text: 'メモ２' }}
        editlink={{ href: '/memo2list', text: 'メモ２編集' }}
      />
    </div>
  );
};

export default Memo2Review;
