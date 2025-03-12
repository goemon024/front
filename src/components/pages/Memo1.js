// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { DataContext } from '../../context/DataContext';
// import dayjs from "dayjs";

import { withCookies } from 'react-cookie';
import styles from '../css/main.module.css';
// import axios from 'axios';
// import API_URL from '../../config';
// import { useCookies } from 'react-cookie';
import TagButton from '../common/tagButton';
import CardButton from '../common/cardButton';
import DrillCardButton from '../common/drillCardButton';

const Memo1 = (props) => {
  // const { memo1Table, loading, userName } = useContext(DataContext);
  // const navigate = useNavigate();

  // const today = dayjs().format("YYYY-MM-DD");
  // const oneWeekAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");

  // const [startDate1, setStartDate1] = useState(oneWeekAgo)
  // const [startDate2, setStartDate2] = useState(oneWeekAgo)
  // const [startDate3, setStartDate3] = useState(oneWeekAgo)
  // const [endDate1, setEndDate1] = useState(today)
  // const [endDate2, setEndDate2] = useState(today)
  // const [endDate3, setEndDate3] = useState(today)

  // const handleSubmit1 = (event) => {
  //     event.preventDefault();
  //     console.log(startDate1, endDate1)
  //     navigate(`/word/calendar?startDate=${startDate1}&endDate=${endDate1}`);
  // };

  // const handleSubmit2 = (event) => {
  //     event.preventDefault();
  //     console.log(startDate2, endDate2)
  //     navigate(`/memo1/calendar?startDate=${startDate2}&endDate=${endDate2}`);
  // };

  // const handleSubmit3 = (event) => {
  //     event.preventDefault();
  //     console.log(startDate3, endDate3)
  //     navigate(`/memo2/calendar?startDate=${startDate3}&endDate=${endDate3}`);
  // };

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

        <div className={styles['memo-container']}>
          <div className={styles['memo-upper-container']}>
            <CardButton
              titleText="復習"
              detailText1="1,7,28日前に登録したメモ"
              href="/memo1/review"
            />
            <CardButton titleText="ＡＬＬ" detailText1="" href="/memo1/all" />
          </div>
          <div style={{ marginLeft: '60px' }}>
            <DrillCardButton titleText="メモ帳１ドリル" link="memo1" />
          </div>
        </div>
      </div>
      <TagButton
        text="メモ１登録"
        link="/memo1/create"
        top="15%"
        backgroundColor="rgba(231, 76, 115, 0.8)"
        color="white"
      />
      <TagButton
        text="編集"
        link="/memo1list"
        top="25%"
        backgroundColor="rgba(52, 152, 219, 0.8)"
        color="white"
      />
      <TagButton
        text="TOP"
        link="/mainpage"
        top="35%"
        backgroundColor="rgba(46, 230, 113, 0.7)"
        color="rgba(50,50,50)"
        width="15rem"
      />
      <TagButton
        text="Logout"
        link="/"
        top="45%"
        backgroundColor="rgba(255, 170, 110, 0.8)"
        color="rgba(50,50,50)"
        logout={true}
        width="15rem"
      />
    </div>
  );
};

export default withCookies(Memo1);
