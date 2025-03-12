import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useCookies } from 'react-cookie';


Modal.setAppElement('#root'); // アクセシビリティのため

const DeleteModal = ({ isOpen, onRequestClose, data, dataDisplay, setTable, apiUrl }) => {
  // const { memo1Table, setMemo1Table } = useContext(DataContext);
  const [cookies] = useCookies(['current-token']);
  const token = cookies['current-token'];

  const handleDelete = async () => {
    try {
      console.log(data.id)
      console.log(data.user)
      console.log(`${apiUrl}${data.id}/`)
      console.log("csrf:" + document.cookie.match(/csrftoken=([^;]*)/)?.[1])


      await axios.delete(`${apiUrl}${data.id}/`, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      // setModalIsOpen(false); // モーダルを閉じる
      // setSelectedItem(null); // 選択をリセット

      setTable(prevTable => prevTable.filter(record => record.id !== data.id));
    } catch (error) {
      console.error("Error display deleting record:", error);
    }
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '90%',
          maxHeight: '90%',
          overflowY: 'auto',
        },
        overlay: {
          backgroundColor: 'rgba(0.5, 0.5, 0.5, 0.01)',
        },
      }}
    >
      <h2>本当に削除しますか？</h2>
      <p>{dataDisplay}</p>
      <div className='container' style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => { handleDelete(); onRequestClose() }} className="btn btn-outline-dark block btn-custom" style={{ width: '5rem' }}>削除</button>
        <button onClick={onRequestClose} className="btn btn-outline-dark block btn-custom" style={{ width: '5rem' }}>Close</button>
      </div>

    </Modal>
  );
};

export default DeleteModal;
