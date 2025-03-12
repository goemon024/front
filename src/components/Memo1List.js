import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import './css/list.css';

import DeleteModal from './DeleteModal';
import UpdateModalMemo1 from './UpdateModalMemo1';
import LogoutButton from './LogoutButton';

import { useCookies } from 'react-cookie';
import Pagenation from './Pagenation';
import { Link } from 'react-router-dom';


const Memo1List = () => {
  const [cookies] = useCookies(['current-token']);  // useCookiesを使う
  const token = cookies['current-token'];           // useCookiesを使う

  const { memo1Table, setMemo1Table } = useContext(DataContext);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);  // モーダル表示時の値の受渡し

  const [pageData, setPageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const api_url = `/api_memo1/memo1/`

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`/api_memo1/pageMemo1/?page=${currentPage}`, {
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

  }, [currentPage, memo1Table]);


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
        <Link to="/memo1">メモ帳１</Link>
        <LogoutButton />
      </div>


      <div className="listContent">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h3 className="display-4" style={{ marginTop: '20px' }}>メモリスト１</h3>
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
                  <span className="memo">{item.memo}</span>
                  <span className="date">{formatDate(item.reg_date)}</span>

                  <div className="buttons">
                    <button onClick={() => { setSelectedItem(item); setUpdateIsOpen(true) }} className="btn btn-info"   >編集</button>
                    <button onClick={() => { setSelectedItem(item); setDeleteIsOpen(true) }} className="btn btn-success">削除</button>

                    {selectedItem && (
                      <UpdateModalMemo1 isOpen={updateIsOpen} onRequestClose={() => setUpdateIsOpen(false)}
                        data={selectedItem} dataDisplay={selectedItem.memo}
                        setTable={setMemo1Table} apiUrl={api_url} />
                    )}

                    {selectedItem && (
                      <DeleteModal isOpen={deleteIsOpen} onRequestClose={() => setDeleteIsOpen(false)}
                        data={selectedItem} dataDisplay={selectedItem.memo.slice(0, 30)}
                        setTable={setMemo1Table} apiUrl={api_url} />
                    )}

                  </div>
                </div>

              ))}
          </div>
        </div>

        <Pagenation totalPages={totalPages} currentPage={currentPage}
          handlePageChange={handlePageChange} />

      </div>
    </div>
  );
}

export default Memo1List
