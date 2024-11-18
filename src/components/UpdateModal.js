import React,{ useEffect, useContext,useState } from 'react';
import { DataContext } from '../context/DataContext';
import Modal from 'react-modal';
import axios from 'axios';
import { useCookies } from 'react-cookie';     


Modal.setAppElement('#root'); // アクセシビリティのため

const UpdateModal = ({ isOpen, onRequestClose, data, dataDisplay}) => {
  const { memo1Table, setMemo1Table } = useContext(DataContext);
  const [ formData, setFormData ]= useState(data.memo);
  const [ cookies ] = useCookies(['current-token']);
  const token = cookies['current-token'];           

  // deleteでは不要だったがformDataを更新するために必要。
  useEffect(() => {
    if (isOpen && data) {
      setFormData(data.memo); // モーダルが開いたときにデータを初期化
    }
  }, [isOpen, data]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api_memo1/memo1/${data.id}/`,
        {id:   data.id,
         user: data.user,
         memo: formData,
         reg_date: data.reg_date},{
        headers: {
          'Authorization': `Token ${token}`, 
        },
      });
      console.log('更新成功')
      setMemo1Table(memo1Table => memo1Table.map(mapdata => mapdata.id === data.id ?
      {...mapdata, memo: formData } : mapdata ));
      onRequestClose(); 
    } catch (error) {
      console.error('更新失敗:', error.response ? error.response.data : error.message);
    }
  };


  const handleInputChange = (e) => {
    setFormData(e.target.value);
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
        },
        overlay: {
          backgroundColor: 'rgba(0.5, 0.5, 0.5, 0.01)',
        },
      }}
    >

      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '500px' }}>
      <p style={{ color: 'silver' }}>入力日時：
        {new Date(data.reg_date).toLocaleDateString('ja-JP',
        { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>
          <label htmlFor="memo">memo:</label>
          <textarea
            id="memo"
            name="memo"
            rows="6"
            cols="300"
            style={{ width: '100%' }}
            value={formData}
            onChange={handleInputChange}
          />
        </p>
        <div class ='container' style={{display: 'flex', gap: '0.5rem'}}>
        <button type="submit" className="btn btn-outline-dark block btn-custom" style={{width:'5rem'}}>Update</button>
        <button type="button" onClick={()=>{onRequestClose();setFormData('');}} className="btn btn-outline-dark block btn-custom" style={{width:'5rem'}}>Close</button>
        </div>
      </form>

    </Modal>
  );
};

export default UpdateModal;