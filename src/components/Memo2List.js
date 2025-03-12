import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import './css/list.css';

import DeleteModal from './DeleteModal';
import UpdateModalMemo2 from './UpdateModalMemo2';
import LogoutButton from './LogoutButton';

import { useCookies } from 'react-cookie';
import Pagenation from './Pagenation';
import { Link } from 'react-router-dom';

const Memo2List = () => {
  const [cookies] = useCookies(['current-token']);  // useCookiesを使う
  const token = cookies['current-token'];

  const { memo2Table, setMemo2Table } = useContext(DataContext);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);  // モーダル表示時の値の受渡し

  const [pageData, setPageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const api_url = `/api_memo2/memo2/`

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`/api_memo2/pageMemo2/?page=${currentPage}`, {
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

  }, [currentPage, memo2Table]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日`; // 月は0始まり
  };

  return (
    <div style={{ display: 'flex' }}>
      <div id="staticMenu">
        {/* <a href="/main">TOP</a> */}
        <Link to="/memo2">メモ帳２</Link>
        <LogoutButton />
      </div>

      <div className="listContent">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4" style={{ marginTop: '20px' }}>メモリスト２</h1>
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
                  <span className="memo1">{item.memo1}</span>
                  <span className="memo2">{item.memo2}</span>

                  <span className="date">{formatDate(item.reg_date)}</span>

                  <div className="buttons">
                    <button onClick={() => { setSelectedItem(item); setUpdateIsOpen(true) }} className="btn btn-info"   >編集</button>
                    <button onClick={() => { setSelectedItem(item); setDeleteIsOpen(true) }} className="btn btn-success">削除</button>

                    {selectedItem && (
                      <UpdateModalMemo2 isOpen={updateIsOpen} onRequestClose={() => setUpdateIsOpen(false)}
                        data={selectedItem} dataDisplay={selectedItem.memo1}
                        setTable={setMemo2Table} apiUrl={api_url} />
                    )}

                    {selectedItem && (
                      <DeleteModal isOpen={deleteIsOpen} onRequestClose={() => setDeleteIsOpen(false)}
                        data={selectedItem} dataDisplay={selectedItem.memo1.slice(0, 30)}
                        setTable={setMemo2Table} apiUrl={api_url} />
                    )}

                  </div>
                </div>

              ))}
          </div>

        </div>

        <Pagenation totalPages={totalPages} currentPage={currentPage}
          handlePageChange={handlePageChange} />

      </div></div>
  );
}


export default Memo2List
