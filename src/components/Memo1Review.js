import React,{ useContext,useState,useEffect } from 'react';
import { DataContext } from '../context/DataContext';

// import axios from 'axios'
import { Typography } from '@mui/material';

// import { useCookies } from 'react-cookie';          // useCookiesを使う
import dayjs from 'dayjs';

import './css/flashcard.css';
import FlashCard from './FlashCard';
import HoverMenu from './HoverMenu';
// import './css/list.css';


// const Memo1Review = () => {
//   const { memo1Table, loading } = useContext(DataContext);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return `${date.getMonth() + 1}月${date.getDate()}日`; // 月は0始まり
// };

//   if (loading) {
//       return <p>Loading...</p>;
//   }


//   return (
//     <div>
//    <div class="jumbotron jumbotron-fluid">
//     <div class="container">
//       <h1 class="display-4">メモリスト</h1>
//     </div>
//    </div>
    
//       <div>
//           <div class="container">
//               {memo1Table
//               .slice()
//               .sort((a,b)=> new Date(b.reg_date) - new Date(a.reg_date))
//               .map(item => (
//             <div class="word-and-buttons" key={item.id}>
//               <span class="memo">{ item.memo }</span>
//               <span class="date">{formatDate(item.reg_date)}</span>
            
//             <div class="buttons">
//               <a href ="" class="btn btn-info" tabindex="-1" role="button" aria-disabled="true">編集</a>
//               <a href ="" class="btn btn-success" tabindex="-1" role="button" aria-disabled="true">削除</a>
//             </div>
//           </div>

//             ))}
//           </div>

//           {/* <ul>
//               {memo1Table.map(item => (
//                 <div class="word-and-buttons">
//                <li key={item.id}>{item.memo}</li>
//                </div>
//             ))}
//           </ul> */}
//       </div>
//     </div>
//   );
// }


const Memo1Review = () => {
  const { memo1Table, loading } = useContext(DataContext);

  if (loading) {
    return <p>Loading...</p>;
}

  // const [state, setState] = useState("card")         // all か flashcardの表示状態設定
  // const [tableData, setTableData] = useState([]);   // テーブルデータの取得状態
  // const [loading, setLoading] = useState(true);     // ローディング状態

  const today    = dayjs().format('YYYY-MM-DD');
  const agoDay1  = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const agoDay7  = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
  const agoDay28 = dayjs().subtract(28, 'day').format('YYYY-MM-DD');

  // const filteredData = memo1Table.filter(data => 
  //   [today,agoDay1,agoDay7,agoDay28].includes(data.reg_date));

  const filteredData = memo1Table.filter(data => 
      [today, agoDay1, agoDay7, agoDay28].includes(dayjs(data.reg_date).format('YYYY-MM-DD'))
    );

  // const filteredData = memo1Table.filter(data => {
  //     const regDate = dayjs(data.reg_date); // data.reg_date を dayjs オブジェクトに変換
  //     return regDate.isAfter(dayjs().subtract(31, 'day')) && regDate.isBefore(dayjs().add(1, 'day'));
  //   });

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
    <FlashCard cardData={shuffleArray(filteredData)} />
    <HoverMenu links={{href:'/memo1',text:'メモ帳編集'}} />
    </div>
  )
}

export default Memo1Review
