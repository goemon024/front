import React,{ useContext,useState } from 'react';
import { DataContext } from '../context/DataContext';
import './css/list.css';

import DeleteModal from './DeleteModal';
import UpdateModalMemo1 from './UpdateModalMemo1';
import LogoutButton from './LogoutButton';

const Memo1List = () => {
  const { memo1Table, setMemo1Table , loading } = useContext(DataContext);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);  // モーダル表示時の値の受渡し

  const api_url = `/api_memo1/memo1/`

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日`; // 月は0始まり
};

  if (loading) {
      return <p>Loading...</p>;
  }


  return (
   <div style={{display:'flex'}}>
    <div id="staticMenu">
    <a href="/main">TOP</a>
    <LogoutButton />
    </div>

   <div className="listContent">
   <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <h1 className="display-4" style={{marginTop:'20px'}}>メモリスト１</h1>
    </div>
   </div>
    
      <div>
          <div className="container" style={{height:'100%'}}>
              {memo1Table
              .slice()
              .sort((a,b)=> new Date(b.reg_date) - new Date(a.reg_date))
              .map(item => (
            <div className="word-and-buttons" key={item.id}>
              <span className="memo">{ item.memo }</span>
              <span className="date">{formatDate(item.reg_date)}</span>
            
            <div className="buttons">
            <button onClick={() => {setSelectedItem(item);setUpdateIsOpen(true)}} className="btn btn-info"   >編集</button>
            <button onClick={() => {setSelectedItem(item);setDeleteIsOpen(true)}} className="btn btn-success">削除</button>

            {selectedItem &&(
            <UpdateModalMemo1 isOpen={updateIsOpen} onRequestClose={() => setUpdateIsOpen(false)}
            data={selectedItem} dataDisplay={selectedItem.memo} 
            setTable={setMemo1Table} apiUrl={api_url} />
            )}
            
            {selectedItem &&(
            <DeleteModal isOpen={deleteIsOpen} onRequestClose={() => setDeleteIsOpen(false)}
            data={selectedItem} dataDisplay={selectedItem.memo.slice(0,30)}
            setTable={setMemo1Table} apiUrl={api_url} />
            )}

            </div>
            </div>

            ))}
          </div>
          </div>
        </div>

    </div>
  );
}

export default Memo1List
