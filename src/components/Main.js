import React,{ useContext,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const MainPage = () => {
  const { memo1Table, loading } = useContext(DataContext);
  console.log(memo1Table.data)

  return (
    <div>
      <h1>Ebing House note application</h1>

      <h2>英単語帳</h2>
      <Link to="/word">
        <button>英単語 全リスト</button>
      </Link>
      <Link to="/word/review">
        <button>復習（1、7、28日前）</button>
      </Link>
      <Link to="/word/all">
        <button>ＡＬＬ</button>
      </Link>
      <Link to="/word/create">
        <button>本日のインプット</button>
      </Link>


      <h2>メモ帳１</h2>
      <Link to="/memo1">
        <button>メモ帳１ 全リスト</button>
      </Link>
      <Link to="/memo1/review">
        <button>復習（1、7、28日前）</button>
      </Link>
      <Link to="/memo1/create">
        <button>本日のインプット</button>
      </Link>


      <h2>メモ帳２</h2>
      <Link to="/memo2">
        <button>メモ帳２ 全リスト</button>
      </Link>
      <Link to="/memo2/review">
        <button>復習（1、7、28日前）</button>
      </Link>

      <Link to="/memo2/ALL">
        <button>ALL</button>
      </Link>

      <Link to="/memo2/create">
        <button>本日のインプット</button>
      </Link>

    </div>
  );
};

export default MainPage;