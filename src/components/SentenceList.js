import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import './css/list.css';

// import DeleteModal from './DeleteModal';

import LogoutButton from './LogoutButton';

import { useCookies } from 'react-cookie';
import Pagenation from './Pagenation';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SentenceList = () => {
  const [cookies] = useCookies(['current-token']); // useCookiesを使う
  const token = cookies['current-token']; // useCookiesを使う

  const { sentenceTable } = useContext(DataContext);
  // const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  // const [updateIsOpen, setUpdateIsOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);  // モーダル表示時の値の受渡し

  const [pageData, setPageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // const api_url = `/api_word/word/`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api_word/pageSentence/?page=${currentPage}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const result = await response.json();
        console.log(result);
        setPageData(result.results);
        setTotalPages(Math.ceil(result.count / 10)); // 1ページあたり20件の場合
      } catch (error) {
        console.error('データ取得エラー:', error);
      }
    };

    fetchData();
  }, [currentPage, sentenceTable]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = async (id, checked) => {
    // front側での即時更新
    setPageData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, fusen: checked } : item))
    );

    console.log({ fusen: checked });

    try {
      await axios.patch(
        `/api_word/sentence/${id}/`,
        { fusen: checked },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log('Update successful');
    } catch (error) {
      console.error('Error updating fusen:', error);

      setPageData((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, fusen: !checked } : item))
      );
    }
  };

  //   const formatDate = (dateString) => {
  //     const date = new Date(dateString);
  //     return `${date.getMonth() + 1}月${date.getDate()}日`; // 月は0始まり
  // };

  return (
    <div style={{ display: 'flex' }}>
      <div id="staticMenu">
        {/* <a href="/main">TOP</a> */}
        <Link to="/sentence">英語例文帳</Link>
        <LogoutButton />
      </div>
      <div className="listContent" style={{ width: '100%' }}>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4" style={{ marginTop: '20px' }}>
              英語例文リスト
            </h1>
          </div>
        </div>

        <Pagenation
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />

        <div>
          <div className="container" style={{ height: '100%' }}>
            {pageData
              .filter((item) => item.eval === 'OK')
              .map((item) => (
                <div className="word-and-buttons" key={item.id}>
                  <input
                    className="checklist"
                    type="checkbox"
                    checked={item.fusen}
                    onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                  />

                  <span style={{ flex: 0.1 }}>{item.word}</span>
                  <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column' }}>
                    <span>{item.eibun}</span>
                    <span>{item.wayaku}</span>
                  </div>
                  {/* <span className="date">{formatDate(item.reg_date)}</span> */}

                  {/* <div className="buttons">
            <button onClick={() => {setSelectedItem(item);setDeleteIsOpen(true)}} className="btn btn-success">削除</button>

            {selectedItem &&(
            <DeleteModal isOpen={deleteIsOpen} onRequestClose={() => setDeleteIsOpen(false)}
            data={selectedItem} dataDisplay={selectedItem.word.slice(0,20)}
            setTable={setWordTable} apiUrl={api_url}  />
            )}

            </div> */}
                </div>
              ))}
          </div>

          <Pagenation
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SentenceList;
