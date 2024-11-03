import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Memo1Comp = (props) => {
  const [state, setState] = useState("all")         // all か flashcardの表示状態設定
  const [tableData, setTableData] = useState([]);   // テーブルデータの取得状態
  const [loading, setLoading] = useState(true);     // ローディング状態

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        const response = await axios.get('http://localhost:8000/api/memo1/memo1',{
          headers:{}
        })
        response.data && setTableData(response.data)

        for (let i=0;i<3;i++){
        console.log(response.data[i].memo)
      }
      }catch(error){
        console.log(error)
      }
    setLoading(false);
    };fetchData();
    }, [] ) 

  return (
    
    <div className='Memo1 List'>
      <h1>メモリスト</h1>
      {tableData.map((data1) => {
      return(      
      <div className="one-data" key={data1.id}>
      <span className="Memo1">{data1.memo}</span>
      <span className="date" >{data1.date}</span>
      <div className="buttons">
       <a href ="" class="btn btn-info" tabindex="-1" role="button" aria-disabled="true">編集</a>
       <a href ="" class="btn btn-success" tabindex="-1" role="button" aria-disabled="true">削除</a>
      </div>
      </div>
      )
    })}

    

    </div>
  )
}

export default Memo1Comp
