import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { DataContext } from '../../context/DataContext';
// import dayjs from "dayjs";

import { withCookies } from 'react-cookie';
import styles from '../css/main.module.css';
import axios from 'axios';
// import API_URL from '../../config';

import TagButton from '../common/tagButton';
import CardButton from '../common/cardButton';
import { useCookies } from 'react-cookie';

const MainPage = (props) => {
  const [cookies] = useCookies(['current-token']); // useCookiesを使う
  const token = cookies['current-token']; // useCookiesを使う

  const [randomWord, setRandomWord] = useState('');
  const [randomWordMean, setRandomWordMean] = useState('');
  const [randomMemo1, setRandomMemo1] = useState('');

  useEffect(() => {
    const fetchRandomWord = async () => {
      try {
        const response1 = await axios.get(`/api_word/pageWord/?page=1`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (response1.data.results && response1.data.results.length > 0) {
          const words = response1.data.results;
          const randomIndex = Math.floor(Math.random() * words.length);
          setRandomWord(words[randomIndex].word);
          setRandomWordMean(words[randomIndex].mean1);
        }
      } catch (error) {
        console.error('Failed to fetch random word:', error);
        setRandomWord('word not found'); // エラー時はデフォルトテキストを表示
        setRandomWordMean(''); // エラー時はデフォルトテキストを表示
      }

      try {
        const response = await fetch(`/api_memo1/pageMemo1/?page=1`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const data = await response.json();
        console.log(data.results[9].memo);
        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          data.results[randomIndex].memo.length < 75
            ? setRandomMemo1(data.results[randomIndex].memo)
            : setRandomMemo1(data.results[randomIndex].memo.substring(0, 50) + '...');
        }
      } catch (error) {
        console.error('Failed to fetch random memo1:', error);
        setRandomMemo1('memo1 not found'); // エラー時はデフォルトテキストを表示
      }
    };
    fetchRandomWord();
    // 30秒ごとに単語を更新
    const interval = setInterval(fetchRandomWord, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundImage: 'url("/static/react/images/login_background2.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        height: 'auto',
        color: '#d0d0d0',
        position: 'relative',
        width: '100%',
        overflow: 'auto',
      }}
    >
      <div className={styles['content-container']}>
        <div
          className={styles['container']}
          style={{ display: 'block', margin: '20px', paddingLeft: '10%' }}
        >
          <h2 style={{ fontSize: '2.5rem' }}>エビングハウス メモ帳１</h2>
          <p style={{ fontSize: '1.5rem' }}>{props.cookies.get('username')} さん</p>
        </div>

        <div className={styles['double-container']}>
          <div
            className={styles['memo-container']}
            style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '25px' }}
          >
            <div className={styles['card-a']}>
              <CardButton
                titleText="英単語帳"
                detailText1={randomWord}
                href="/word"
                detailText2={randomWordMean}
                backgroundColor="rgba(190, 255, 255, 0.9)"
              />
            </div>
            <div className={styles['card-b']}>
              <CardButton
                titleText="英語 例文帳"
                detailText1="英単語帳でチェックした単語を用いた例文（複数単語の同時使用例文をGPT生成）"
                href="/sentence"
              />
            </div>
          </div>

          <div className={styles['memo-container']}>
            <div className={styles['card-c']}>
              <CardButton titleText="メモ帳１" detailText1={randomMemo1} href="/memo1" />
            </div>
            <div className={styles['card-d']}>
              <CardButton titleText="メモ帳２" detailText1="" href="/memo2" />
            </div>
          </div>
        </div>
      </div>
      <TagButton
        text="Logout"
        link="/"
        top="85%"
        backgroundColor="rgba(255, 170, 110, 0.8)"
        color="rgba(50,50,50)"
        logout={true}
        width="25rem"
      />
    </div>

    // /* <div className={styles["memo-container"]}>
    //               <div className={styles["memo-upper-container"]}>
    //                   <CardButton titleText="復習" detailText1="1,7,28日前に登録したメモ" href="/memo1/review" />
    //                   <CardButton titleText="ＡＬＬ" detailText1="" href="/memo1/all" />
    //               </div>
    //               <div style={{ marginLeft: '60px' }}>
    //                   <DrillCardButton titleText="メモ帳１ドリル" link="memo1" />
    //               </div>
    //           </div>
    //       </div>
    //       <TagButton text="メモ１登録" link="/memo1/create" top="15%" backgroundColor="rgba(231, 76, 115, 0.8)" color="white" />
    //       <TagButton text="編集" link="/memo1list" top="25%" backgroundColor="rgba(52, 152, 219, 0.8)" color="white" />
    //       <TagButton text="TOP" link="/mainpage" top="35%" backgroundColor="rgba(46, 230, 113, 0.7)" color="rgba(50,50,50)" width="15rem" />
    //       <TagButton text="Logout" link="/" top="45%" backgroundColor="rgba(255, 170, 110, 0.8)" color="rgba(50,50,50)" logout={true} width="15rem" /> */}

    //     // </div >
    //     // <div style={{
    //     //   backgroundImage: 'url("/static/react/images/login_background2.webp")',
    //     //   backgroundSize: 'cover',
    //     //   backgroundPosition: 'center',
    //     //   justifyContent: 'center',
    //     //   alignItems: 'center',
    //     //   height: '100vh',
    //     //   color: '#d0d0d0',
    //     // }}>
    //     //   <div className={styles['main-container']}>

    //     //     <div className={styles["content-container"]}>
    //     //       <div className={styles["container"]} style={{ display: "block", margin: "20px", paddingLeft: "10%" }}>
    //     //         <h2 style={{ fontSize: "2.5rem" }}>エビングハウス 英単語帳＆メモ帳</h2>
    //     //         <p style={{ fontSize: "1.5rem" }}>{props.cookies.get("username")} さん</p>
    //     //       </div>

    //     //       <div className={styles["double-container"]} style={{
    //     //         display: "flex",
    //     //         // justifyContent: "center",
    //     //         // alignContent: "center",
    //     //         margin: "0 auto",  // 中央揃え
    //     //         padding: "0 200px"  // 左右の余白
    //     //       }}>

    //     //         <div className={styles["memo-container"]} style={{ display: "flex", flexDirection: "column", gap: "30px", marginTop: "25px" }}>
    //     //           <div className={styles["card-a"]}>
    //     //             <CardButton titleText="英単語帳" detailText1={randomWord} href="/word" detailText2={randomWordMean} backgroundColor="rgba(190, 255, 255, 0.9)" />
    //     //           </div>
    //     //           <div className={styles["card-b"]}>
    //     //             <CardButton titleText="英語 例文帳" detailText1="英単語帳でチェックした単語を用いた例文（複数単語の同時使用例文をGPT生成）" href="/sentence" />
    //     //           </div>
    //     //         </div>

    //     //         <div className={styles["memo-container"]}>
    //     //           <div className={styles["card-c"]}>
    //     //             <CardButton titleText="メモ帳１" detailText1={randomMemo1} href="/memo1" />
    //     //           </div>
    //     //           <div className={styles["card-d"]}>
    //     //             <CardButton titleText="メモ帳２" detailText1="" href="/memo2" />
    //     //           </div>
    //     //         </div>

    //     //       </div>
    //     //     </div>
    //     //   </div>

    //     //   <TagButton text="Logout" link="/" top="75%" backgroundColor="rgba(255, 170, 110, 0.8)" color="rgba(50,50,50)" logout={true} width="25rem" />

    //     // </div>
  );
};

export default withCookies(MainPage);
