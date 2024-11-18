import React,{ useContext,useState,useEffect } from 'react';
import { DataContext } from '../context/DataContext';

// import axios from 'axios'
import { Typography } from '@mui/material';

// import { useCookies } from 'react-cookie';          // useCookiesを使う
import dayjs from 'dayjs';

// import './css/flashcard.css';
// import FlashCard from './FlashCard';
import './css/list.css';
import HoverMenu from './HoverMenu';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';



const Memo1List = () => {
  const { memo1Table, setMemo1Table , loading } = useContext(DataContext);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);  // モーダル表示時の値の受渡し

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日`; // 月は0始まり
};

  if (loading) {
      return <p>Loading...</p>;
  }


  return (
    <div>
   <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">メモリスト</h1>
    </div>
   </div>
    
      <div>
          <div class="container">
              {memo1Table
              .slice()
              .sort((a,b)=> new Date(b.reg_date) - new Date(a.reg_date))
              .map(item => (
            <div class="word-and-buttons" key={item.id}>
              <span class="memo">{ item.memo }</span>
              <span class="date">{formatDate(item.reg_date)}</span>
            
            <div class="buttons">
            <button onClick={() => {setSelectedItem(item);setUpdateIsOpen(true)}} class="btn btn-info"   >編集</button>
            <button onClick={() => {setSelectedItem(item);setDeleteIsOpen(true)}} class="btn btn-success">削除</button>

            {selectedItem &&(
            <UpdateModal isOpen={updateIsOpen} onRequestClose={() => setUpdateIsOpen(false)}
            data={selectedItem} dataDisplay={selectedItem.memo}/>
            )}
            
            {selectedItem &&(
            <DeleteModal isOpen={deleteIsOpen} onRequestClose={() => setDeleteIsOpen(false)}
            data={selectedItem} dataDisplay={selectedItem.memo.slice(0,30)}/>
            )}

            </div>
            </div>

            ))}
          </div>

          {/* <ul>
              {memo1Table.map(item => (
                <div class="word-and-buttons">
               <li key={item.id}>{item.memo}</li>
               </div>
            ))}
          </ul> */}
        </div>
    {/* <HoverMenu links={{ href: '/memo1', text: 'メモ帳編集'}} /> */}
    <HoverMenu links={[]} />
    {/* <DeleteModal /> */}
    </div>
  );
}


// const Memo1Comp = (props) => {

//   // const [cookies] = useCookies(['current-token']);  // useCookiesを使う
//   // const token = cookies['current-token'];           // useCookiesを使う

//   const [state, setState] = useState("card")         // all か flashcardの表示状態設定
//   const [tableData, setTableData] = useState([]);   // テーブルデータの取得状態
//   const [loading, setLoading] = useState(true);     // ローディング状態

//   const today    = dayjs().format('YYYY-MM-DD');
//   const agoDay1  = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
//   const agoDay7  = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
//   const agoDay28 = dayjs().subtract(28, 'day').format('YYYY-MM-DD');


//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try{
//         const response = await axios.get('http://localhost:8000/api_memo1/memo1',{
//           headers: {
//             'Authorization': `Token ${token}`
//           }
//         })
//         response.data && setTableData(response.data)

//         for (let i=0;i<3;i++){
//         console.log(response.data[i].memo)
//       }
//       }catch(error){
//         console.log(error)
//       }
//     setLoading(false);
//     };fetchData();
//     }, [] ) 

//    const filteredData = tableData.filter(data => 
//     [today,agoDay1,agoDay7,agoDay28].includes(data.reg_date));
   
// //   const reviewData = tableData.filter(data => data.date.includes());

 

//   return (
    
//     state ==="all" ? 
//     <div className='Memo1 List'>
//       <h1>メモリスト</h1>
//       {tableData.map((data1) => {
//       return(      
//       <div className="one-data" key={data1.id}>
//       <span className="Memo1">{data1.memo}</span>
//       <span className="reg_date" >{data1.reg_date}</span>
//       <div className="buttons">
//        <a href ="" class="btn btn-info" tabindex="-1" role="button" aria-disabled="true">編集</a>
//        <a href ="" class="btn btn-success" tabindex="-1" role="button" aria-disabled="true">削除</a>
//       </div>
//       </div>
//       )
//     })}
//     </div>:
//     <div>
//     <FlashCard cardData={filteredData}/>
//     </div>
//   )
// }

export default Memo1List
