import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Typography } from '@mui/material';

import { useCookies } from 'react-cookie';          // useCookiesを使う
import dayjs from 'dayjs';

import './css/flashcard.css';
import FlashCard from './FlashCard';

const WordComp = (props) => {
  const [cookies] = useCookies(['current-token']);  // useCookiesを使う
  const token = cookies['current-token'];           // useCookiesを使う

  const [state, setState] = useState("all")         // all か flashcardの表示状態設定
  const [tableData, setTableData] = useState([]);   // テーブルデータの取得状態
  const [loading, setLoading] = useState(true);     // ローディング状態

  const today    = dayjs().format('YYYY-MM-DD');
  const agoDay1  = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const agoDay7  = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
  const agoDay28 = dayjs().subtract(28, 'day').format('YYYY-MM-DD');


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        const response = await axios.get('http://localhost:8000/api_word/word',{
          headers: {
            'Authorization': `Token ${token}`
          }
        })
        response.data && setTableData(response.data)

        for (let i=0;i<3;i++){
        console.log(response.data[i].word)
      }
      }catch(error){
        console.log(error)
      }
    setLoading(false);
    };fetchData();
    }, [] ) 

   const filteredData = tableData.filter(data => 
    [today,agoDay1,agoDay7,agoDay28].includes(data.reg_date));
   
//   const reviewData = tableData.filter(data => data.date.includes());

 

  return (
    
    state ==="all" ? 
    <div className='Words List'>
      <h1>英単語リスト</h1>
      {tableData.map((data1) => {
      return(      
      <div className="one-data" key={data1.id}>
      <span className="word">{data1.word}</span>
      <span className="reg_date" >{data1.reg_date}</span>
      <div className="buttons">
       <a href ="" class="btn btn-info" tabindex="-1" role="button" aria-disabled="true">編集</a>
       <a href ="" class="btn btn-success" tabindex="-1" role="button" aria-disabled="true">削除</a>
      </div>
      </div>
      )
    })}
    </div>:
    <div>
    <FlashCard cardData={filteredData}/>
    </div>
  )
}

export default WordComp
