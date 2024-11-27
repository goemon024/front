import React,{ useContext,useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import dayjs from "dayjs";

import { CookiesProvider, withCookies } from 'react-cookie';
import './css/main.css';

const MainPage = (props) => {
  const { memo1Table, loading, userName } = useContext(DataContext);
  const navigate = useNavigate();

  const today = dayjs().format("YYYY-MM-DD");
  const oneWeekAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");

  const [startDate1,setStartDate1]=useState(oneWeekAgo)
  const [startDate2,setStartDate2]=useState(oneWeekAgo)
  const [startDate3,setStartDate3]=useState(oneWeekAgo)
  const [endDate1,setEndDate1]=useState(today)
  const [endDate2,setEndDate2]=useState(today)
  const [endDate3,setEndDate3]=useState(today)

  const handleSubmit1 = (event) => {
    event.preventDefault();
    console.log(startDate1,endDate1)
    navigate(`/word/calendar?startDate=${startDate1}&endDate=${endDate1}`);
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    console.log(startDate2,endDate2)
    navigate(`/word/calendar?startDate=${startDate2}&endDate=${endDate2}`);
  };

  const handleSubmit3 = (event) => {
    event.preventDefault();
    console.log(startDate3,endDate3)
    navigate(`/word/calendar?startDate=${startDate3}&endDate=${endDate3}`);
  };


  return (

    <div style={{
      backgroundImage: 'url("/images/login_background2.webp")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      color: '#d0d0d0',
      }}>
<div className="main-container">
<div className = "menu-container">
        {/* <button class="media-large btn btn-secondary mb-2"  style={{marginTop:'5em'}}>チュートリアル</button> */}
        <Link to="/word">
                <button className="media-large btn btn-secondary mb-2" style={{marginTop:'3em'}}>英単語帳編集</button>
        </Link>
        <Link to="/memo1">
                <button className="media-large btn btn-secondary mb-2" style={{marginTop:'3em'}}>メモ帳１編集</button>
        </Link>
        <Link to="/memo2">
                <button className="media-large btn btn-secondary mb-2" style={{marginTop:'3em'}}>メモ帳２編集</button>
        </Link>


        <div style={{border: '2px solid #8FBC8F', borderRadius: '10px', padding:'5%'}}>
        <form onSubmit={handleSubmit1}>
          <label htmlFor="start_date">開始日:</label>
          <input
            type="date"
            id="start_date"
            value={startDate1}
            onChange={(e) => setStartDate1(e.target.value)}
          />
          <br />
          <label htmlFor="end_date">終了日:</label>
          <input
            type="date"
            id="end_date"
            value={endDate1}
            onChange={(e) => setEndDate1(e.target.value)}
          />
          <br />
          <button type="submit">送信</button>
        </form>


        {/* <form method="get" action="{% url 'wlist:word_drill' %}" >
            <p class="block">英単語ドリル</p>
            <div style={{display: 'flex',justifyContent: 'flex-end',gap:'1em'}}>
            <label for="w1_date">From:</label> */}
            {/* <input type="date" id="w1_date" name="start_date" value="{{ start_date | date:'Y-m-d'}}"> */}
            {/* </div>
            <div style={{display: 'flex',justifyContent: 'flex-end',gap:'1em'}}>
            <label for="w2_date">To:</label> */}
            {/* <input type="date" id="w2_date" name="end_date" value="{{ end_date | date:'Y-m-d'}}"> */}
            {/* </div>
            <button class='btn btn-success block' style={{width: '85%', alignSelf: 'right'}} type="submit">開始</button>
        </form> */}

        </div>
</div>



<div className="content-container">
        <div className="container" style={{display: "block",margin:"20px"}}>
            <h2>エビングハウス 英単語帳＆メモ帳</h2>
            <p>{props.cookies.get("username")} さん</p>    
        </div>
        <div className="container" style={{display: "flex",margin:"20px"}}>
            <div id="menu1" style={{border:"8px solid greenyellow",  backgroundColor:"rgba(0,100,100,0.2)"}}>
                <h3>英単語帳</h3>
                <Link to="/word/create">
                <button className="btn btn-success mb-2" >今日のインプット</button>
                </Link>
                <Link to="/word/review">
                <button className="btn btn-success mb-2" >復習（1,7,28日前）</button>
                </Link>
                <Link to="/word/all">
                <button className="btn btn-success mb-2" >ＡＬＬ</button>
                </Link>
            </div>

            <div id="menu2" style={{border:"8px solid #339fff",  backgroundColor:"rgba(50,100,150,0.2)"}}>
                <h3>メモ帳１</h3>
                <Link to="/memo1/create">
                <button className="btn btn-primary mb-2" >今日のインプット</button>
                </Link>
                <Link to="/memo1/review">
                <button className="btn btn-primary mb-2" >復習（1,7,28日前）</button>
                </Link>
                <Link to="/memo1/all">
                <button className="btn btn-primary mb-2" >ＡＬＬ</button>
                </Link>
            </div>
            

            <div id="menu1" style={{border:'8px solid #55d0ff', backgroundColor: 'rgba(60,100,60,0.2)'}}>
                <h3>メモ帳２</h3>
                <Link to="/memo2/create">
                <button className="btn btn-light mb-2" >今日のインプット</button>
                </Link>
                <Link to="/memo2/review">
                <button className="btn btn-light mb-2" >復習（1,7,28日前）</button>
                </Link>
                <Link to="/memo2/all">
                <button className="btn btn-light mb-2" >ＡＬＬ</button>
                </Link>
            </div>

            </div>  </div></div>    </div>
  );
};

export default withCookies(MainPage);