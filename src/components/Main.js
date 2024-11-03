import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <h1>Ebing House note application</h1>

      <h2>英単語帳</h2>
      <Link to="/word/full">
        <button>英単語 全リスト</button>
      </Link>
      <Link to="/word/partial">
        <button>復習（1、7、28日前）</button>
      </Link>

      <h2>メモ帳１</h2>
      <Link to="/memo1/full">
        <button>メモ帳１ 全リスト</button>
      </Link>
      <Link to="/memo1/partial">
        <button>復習（1、7、28日前）</button>
      </Link>

      <h2>メモ帳２</h2>
      <Link to="/memo2/full">
        <button>メモ帳２ 全リスト</button>
      </Link>
      <Link to="/memo2/partial">
        <button>復習（1、7、28日前）</button>
      </Link>
    </div>
  );
};

export default MainPage;