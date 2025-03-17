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
    const interval = setInterval(fetchRandomWord, 20000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className={styles['background-wrapper']}
      style={{ backgroundImage: 'url("/static/react/images/login_background2.webp")' }}>
      <div className={styles['background-wrapper2']}>
        <div className={styles['content-container']}>
          <div
            className={styles['title-container']}
          >
            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', whiteSpace: 'nowrap', }}>
              エビングハウス 英単語帳＆メモ帳</h2>
            <p style={{ fontSize: '1.5rem' }}>{props.cookies.get('username')} さん</p>
          </div>

          <div className={styles['double-container']}>
            <div className={styles['memo-container']}>
              <div>
                <CardButton
                  titleText="英単語帳"
                  detailText1={randomWord}
                  href="/word"
                  detailText2={randomWordMean}
                  backgroundColor="rgba(205, 255, 255, 0.9)"
                />
              </div>
              <div>
                <CardButton
                  titleText="英語 例文帳"
                  detailText1=""
                  href="/sentence"
                />
              </div>
            </div>

            <div className={styles['memo-container']}>
              <div>
                <CardButton titleText="メモ帳１" detailText1={randomMemo1} href="/memo1" />
              </div>
              <div>
                <CardButton titleText="メモ帳２" detailText1="" href="/memo2" />
              </div>
            </div>
          </div>
        </div>
        <TagButton
          text="Logout"
          link="/"
          top="75%"
          backgroundColor="rgba(255, 170, 110, 0.8)"
          color="rgba(50,50,50)"
          logout={true}
          width="20rem"
        />
      </div>
    </div>


  );
};

export default withCookies(MainPage);
