import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

import { useLocation } from 'react-router-dom';

// import axios from 'axios'

// import { useCookies } from 'react-cookie';          // useCookiesを使う
import dayjs from 'dayjs';

import './css/flashcard.css';
import FlashMemo1 from './FlashMemo1';
import FlashMemo2 from './FlashMemo2';
import FlashWord from './FlashWord';
import FlashSentence from './FlashSentence';
import HoverMenu from './HoverMenu';
// import './css/list.css';

const WordMemoReview = ({
  selectedTable,
  isAll = false,
  isCalendar = false,
  isList = false,
  isSentenceAll = false,
  isSentenceList = false,
}) => {
  const { loading } = useContext(DataContext);
  const { wordTable, memo1Table, memo2Table, sentenceTable } = useContext(DataContext);
  const location = useLocation();

  const tableData = {
    word: wordTable,
    memo1: memo1Table,
    memo2: memo2Table,
    sente: sentenceTable,
  }[selectedTable];

  if (loading) {
    return <p>Loading...</p>;
  }

  // url navigatorからのstartDateとendDateの受取
  const queryParams = new URLSearchParams(location.search);
  const startDate = queryParams.get('startDate');
  const endDate = queryParams.get('endDate');

  // const [state, setState] = useState("card")         // all か flashcardの表示状態設定
  // const [tableData, setTableData] = useState([]);   // テーブルデータの取得状態
  // const [loading, setLoading] = useState(true);     // ローディング状態

  const today = dayjs().format('YYYY-MM-DD');
  const agoDay1 = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const agoDay7 = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
  const agoDay28 = dayjs().subtract(28, 'day').format('YYYY-MM-DD');

  // const filteredData = memo1Table.filter(data =>
  //   [today,agoDay1,agoDay7,agoDay28].includes(data.reg_date));

  console.log(startDate, endDate);

  // isListは、英単語のfusen対応のみ想定している。
  const filteredData =
    isSentenceAll === true
      ? tableData.filter((data) => {
          return data.eval === 'OK';
        })
      : isSentenceList === true
        ? tableData.filter((data) => {
            return data.eval === 'OK' && data.fusen === true;
          })
        : isList === true
          ? tableData.filter((data) => {
              return data.fusen === true;
            })
          : isCalendar === true
            ? tableData.filter((data) => {
                const regDate = dayjs(data.reg_date).format('YYYY-MM-DD'); // 日付をフォーマット
                return startDate && endDate
                  ? regDate >= startDate && regDate <= endDate // 開始日と終了日の範囲内
                  : true;
              })
            : isAll === true
              ? tableData
              : tableData.filter((data) =>
                  [today, agoDay1, agoDay7, agoDay28].includes(
                    dayjs(data.reg_date).format('YYYY-MM-DD')
                  )
                );

  // if (isAll !== true){
  // const filteredData = tableData.filter(data =>
  //     [today, agoDay1, agoDay7, agoDay28].includes(dayjs(data.reg_date).format('YYYY-MM-DD'))
  //   );
  // }
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
      {selectedTable === 'memo1' ? (
        <FlashMemo1 cardData={shuffleArray(filteredData)} />
      ) : selectedTable === 'memo2' ? (
        <FlashMemo2 cardData={shuffleArray(filteredData)} />
      ) : selectedTable === 'sente' ? (
        <FlashSentence cardData={shuffleArray(filteredData)} />
      ) : (
        <FlashWord cardData={shuffleArray(filteredData)} />
      )}

      {selectedTable === 'memo1' ? (
        <HoverMenu
          menuLink={{ href: '/memo1', text: 'メモ帳１' }}
          editLink={{ href: '/memo1list', text: 'メモ１編集' }}
        />
      ) : selectedTable === 'memo2' ? (
        <HoverMenu
          menuLink={{ href: '/memo2', text: 'メモ帳２' }}
          editLink={{ href: '/memo2list', text: 'メモ２編集' }}
        />
      ) : selectedTable === 'word' ? (
        <HoverMenu
          menuLink={{ href: '/word', text: '英単語帳' }}
          editLink={{ href: '/wordlist', text: '英単語帳編集' }}
        />
      ) : (
        <HoverMenu
          menuLink={{ href: '/sentence', text: '英例文帳' }}
          editLink={{ href: '/sentencelist', text: 'Sentence帳編集' }}
        />
      )}
    </div>
  );
};

export default WordMemoReview;
