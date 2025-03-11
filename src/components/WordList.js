import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../context/DataContext';
import './css/list.css';

import DeleteModal from './DeleteModal';
import UpdateModalWord from './UpdateModalWord';
import LogoutButton from './LogoutButton';

import { useCookies } from 'react-cookie';
import Pagenation from './Pagenation';
import axios from 'axios';

import { Link } from 'react-router-dom';


const WordList = () => {
  const [cookies] = useCookies(['current-token']);  // useCookiesを使う
  const token = cookies['current-token'];           // useCookiesを使う

  const { wordTable, setWordTable } = useContext(DataContext);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);  // モーダル表示時の値の受渡し

  const [pageData, setPageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const api_url = `/api_word/word/`

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`/api_word/pageWord/?page=${currentPage}`, {
          headers: {
            'Authorization': `Token ${token}`
          },
        });
        const result = await response.json();
        console.log(result)
        setPageData(result.results);
        setTotalPages(Math.ceil(result.count / 20)); // 1ページあたり20件の場合
      } catch (error) {
        console.error('データ取得エラー:', error);
      }
    };

    fetchData();

  }, [currentPage, wordTable]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = async (id, checked) => {
    // front側での即時更新
    setPageData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, fusen: checked } : item
      )
    );

    console.log({ fusen: checked });

    try {
      await axios.patch(
        `/api_word/word/${id}/`,
        { fusen: checked },
        {
          headers: {
            'Authorization': `Token ${token}`,
          },
        }
      );
      console.log('Update successful');
    } catch (error) {
      console.error('Error updating fusen:', error);

      setPageData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, fusen: !checked } : item
        ));
    };
  }


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日`; // 月は0始まり
  };

  return (
    <div style={{ display: 'flex' }}>
      <div id="staticMenu">
        {/* <a href="/main">TOP</a> */}
        <Link to="/main">TOP</Link>
        <LogoutButton />
      </div>
      <div className='listContent'>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4" style={{ marginTop: '20px' }}>英単語リスト</h1>
          </div>
        </div>

        <Pagenation totalPages={totalPages} currentPage={currentPage}
          handlePageChange={handlePageChange} />

        <div>
          <div className="container" style={{ height: '100%' }}>
            {pageData
              .slice()
              .sort((a, b) => new Date(b.reg_date) - new Date(a.reg_date))
              .map(item => (
                <div className="word-and-buttons" key={item.id}>

                  <input
                    className="checklist"
                    type="checkbox"
                    checked={item.fusen}
                    onChange={(e) => handleCheckboxChange(item.id, e.target.checked)} />

                  <span className="word">{item.word}</span>
                  <span className="mean1">{item.mean1}</span>
                  <span className="mean2">{item.mean2}</span>

                  <span className="date">{formatDate(item.reg_date)}</span>

                  <div className="buttons">
                    <button onClick={() => { setSelectedItem(item); setUpdateIsOpen(true) }} className="btn btn-info"   >編集</button>
                    <button onClick={() => { setSelectedItem(item); setDeleteIsOpen(true) }} className="btn btn-success">削除</button>

                    {selectedItem && (
                      <UpdateModalWord isOpen={updateIsOpen} onRequestClose={() => setUpdateIsOpen(false)}
                        data={selectedItem} dataDisplay={selectedItem.word}
                        setTable={setWordTable} apiUrl={api_url} />
                    )}

                    {selectedItem && (
                      <DeleteModal isOpen={deleteIsOpen} onRequestClose={() => setDeleteIsOpen(false)}
                        data={selectedItem} dataDisplay={selectedItem.word.slice(0, 20)}
                        setTable={setWordTable} apiUrl={api_url} />
                    )}

                  </div>
                </div>

              ))}
          </div>

          <Pagenation totalPages={totalPages} currentPage={currentPage}
            handlePageChange={handlePageChange} />

        </div>
      </div></div>
  )
}

export default WordList
