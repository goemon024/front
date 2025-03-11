import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import dayjs from "dayjs";

import { CookiesProvider, withCookies } from 'react-cookie';
import styles from '../css/main.module.css';
import axios from 'axios';
import API_URL from '../../config';

import TagButton from '../common/tagButton'
import CardButton from '../common/cardButton';
import { useCookies } from 'react-cookie';

const MainPage = (props) => {
  const [cookies] = useCookies(['current-token']);  // useCookiesを使う
  const token = cookies['current-token'];           // useCookiesを使う

  const [randomWord, setRandomWord] = useState("");
  const [randomWordMean, setRandomWordMean] = useState("");
  const [randomMemo1, setRandomMemo1] = useState("");

  useEffect(() => {
    const fetchRandomWord = async () => {

      try {
        const response1 = await axios.get(`/api_word/pageWord/?page=1`, {
          headers: {
            'Authorization': `Token ${token}`
          },
        }
        );
        if (response1.data.results && response1.data.results.length > 0) {
          const words = response1.data.results;
          const randomIndex = Math.floor(Math.random() * words.length);
          setRandomWord(words[randomIndex].word);
          setRandomWordMean(words[randomIndex].mean1);


        }
      } catch (error) {
        console.error('Failed to fetch random word:', error);
        setRandomWord("word not found"); // エラー時はデフォルトテキストを表示
        setRandomWordMean(""); // エラー時はデフォルトテキストを表示
      }

      try {
        const response = await fetch(`/api_memo1/pageMemo1/?page=1`, {
          headers: {
            'Authorization': `Token ${token}`
          },
        });

        const data = await response.json();
        console.log(data.results[9].memo)
        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          data.results[randomIndex].memo.length < 75
            ? setRandomMemo1(data.results[randomIndex].memo)
            : setRandomMemo1(data.results[randomIndex].memo.substring(0, 50) + "...");
        }
      } catch (error) {
        console.error('Failed to fetch random memo1:', error);
        setRandomMemo1("memo1 not found"); // エラー時はデフォルトテキストを表示
      }
    };
    fetchRandomWord();
    // 30秒ごとに単語を更新
    const interval = setInterval(fetchRandomWord, 300000);
    return () => clearInterval(interval);
  }, []);


  const { memo1Table, loading, userName } = useContext(DataContext);
  const navigate = useNavigate();

  const today = dayjs().format("YYYY-MM-DD");
  const oneWeekAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");

  const [startDate1, setStartDate1] = useState(oneWeekAgo)
  const [startDate2, setStartDate2] = useState(oneWeekAgo)
  const [startDate3, setStartDate3] = useState(oneWeekAgo)
  const [endDate1, setEndDate1] = useState(today)
  const [endDate2, setEndDate2] = useState(today)
  const [endDate3, setEndDate3] = useState(today)

  const handleSubmit1 = (event) => {
    event.preventDefault();
    console.log(startDate1, endDate1)
    navigate(`/word/calendar?startDate=${startDate1}&endDate=${endDate1}`);
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    console.log(startDate2, endDate2)
    navigate(`/memo1/calendar?startDate=${startDate2}&endDate=${endDate2}`);
  };

  const handleSubmit3 = (event) => {
    event.preventDefault();
    console.log(startDate3, endDate3)
    navigate(`/memo2/calendar?startDate=${startDate3}&endDate=${endDate3}`);
  };

  const handleLogout = async () => {

    // const token = localStorage.getItem('current-token');
    // try {
    //   await axios.post(`${API_URL}/api/logout/`, null, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-CSRFToken': document.cookie.match(/csrftoken=([^;]*)/)?.[1], // CSRFトークンを取得
    //       ...(token && { 'Authorization': `Bearer ${token}` }),
    //     },
    //     withCredentials: true, // クッキーを送信
    //   });
    localStorage.removeItem('current-token');
    localStorage.removeItem('username');
    window.location.href = '/';
    // } catch (error) {
    //   console.error('ログアウトエラー:', error);
    // }
  };

  return (

    <div style={{
      backgroundImage: 'url("/static/react/images/login_background2.webp")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      color: '#d0d0d0',
    }}>
      <div className={styles['main-container']}>

        <div className={styles["content-container"]}>
          <div className={styles["container"]} style={{ display: "block", margin: "20px" }}>
            <h2>エビングハウス 英単語帳＆メモ帳</h2>
            <p>{props.cookies.get("username")} さん</p>
          </div>

          <div className={styles["card-container"]} style={{
            display: "flex", justifyContent: "center",
            alignContent: "center",
            gap: "40px"
          }}>
            <div className={styles["word-container"]} style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              <div className={styles["card-a"]}>
                <CardButton titleText="英単語帳" detailText1={randomWord} href="/word" detailText2={randomWordMean} />
              </div>
              <div className={styles["card-b"]}>
                <CardButton titleText="英単語 例文帳" detailText1="" href="/word" />
              </div>
            </div>

            <div className={styles["memo-container"]}>
              <div className={styles["card-c"]}>
                <CardButton titleText="メモ帳１" detailText1={randomMemo1} href="/memo1" />
              </div>
              <div className={styles["card-d"]}>
                <CardButton titleText="メモ帳２" detailText1="" href="/memo2" />
              </div>
            </div>

            {/* <CardButton titleText="英単語帳" detailText1={randomWord} href="/wordlist" detailText2={randomWordMean} />
            <CardButton titleText="メモ帳１" detailText1={randomMemo1} href="/memo1list" />
            <CardButton titleText="メモ帳２" detailText1="" href="/memo2list" />
            <CardButton titleText="英単語 例文帳" detailText1="" href="/memo2list" /> */}

          </div>
        </div>
      </div>

      {/* <TagButton text="top" link="/mainpage" top="55%" backgroundColor="orange" color="rgba(50,50,50)" />
      <TagButton text="編集" link="/wordlist" top="65%" backgroundColor="orange" color="rgba(50,50,50)" /> */}
      <TagButton text="logout" link="/" top="75%" backgroundColor="orange" color="rgba(50,50,50)" logout={true} />


    </div>
  );
};

export default withCookies(MainPage);