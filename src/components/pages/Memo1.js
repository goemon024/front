import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import dayjs from "dayjs";

import { CookiesProvider, withCookies } from 'react-cookie';
import styles from '../css/main.module.css';
import axios from 'axios';
import API_URL from '../../config';
import { useCookies } from 'react-cookie';
import TagButton from '../common/tagButton'
import CardButton from '../common/cardButton';
import DrillCardButton from '../common/drillCardButton';

const Memo1 = (props) => {
    const { memo1Table, loading, userName } = useContext(DataContext);
    const navigate = useNavigate();

    const today = dayjs().format("YYYY-MM-DD");
    const oneWeekAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");

    const [startDate1, setStartDate1] = useState(oneWeekAgo)
    const [startDate2, setStartDate2] = useState(oneWeekAgo)
    const [startDate3, setStartDate3] = useState(oneWeekAgo)
    const [endDate1, setEndDate1] = useState(today)
    const [endDate2, setEndDate2] = useState(today)
    const [endDate3, setEndDate3] = useState(today)

    const handleSubmit1 = (event) => {
        event.preventDefault();
        console.log(startDate1, endDate1)
        navigate(`/word/calendar?startDate=${startDate1}&endDate=${endDate1}`);
    };

    const handleSubmit2 = (event) => {
        event.preventDefault();
        console.log(startDate2, endDate2)
        navigate(`/memo1/calendar?startDate=${startDate2}&endDate=${endDate2}`);
    };

    const handleSubmit3 = (event) => {
        event.preventDefault();
        console.log(startDate3, endDate3)
        navigate(`/memo2/calendar?startDate=${startDate3}&endDate=${endDate3}`);
    };


    return (

        <div style={{
            backgroundImage: 'url("/static/react/images/login_background2.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: '#d0d0d0',
        }}>
            {/* <div className={styles['main-container']}> */}
            {/* <div className={styles["menu-container"]}>
                    <div style={{
                        border: '2px solid #339fff', borderRadius: '10px', padding: '5%',
                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1em'
                    }}>
                        <form onSubmit={handleSubmit2}>
                            <p style={{ fontSize: '20px', marginBottom: '10px', alignSelf: 'flex-start' }}>メモ帳１ドリル</p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1em', width: '100%' }}>
                                <label htmlFor="start_date" style={{ justifyContent: 'flex-start' }}>From:</label>
                                <input type="date" id="start_date" value={startDate2} onChange={(e) => setStartDate2(e.target.value)}
                                />
                            </div>
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1em', width: '100%' }}>
                                <label htmlFor="end_date">to:</label>
                                <input type="date" id="end_date" value={endDate2} onChange={(e) => setEndDate2(e.target.value)}
                                /></div>
                            <br />
                            <button type="submit" class='btn btn-primary block' style={{ width: '75%', alignSelf: 'right' }}>開始</button>
                        </form>
                    </div>
                </div> */}
            {/* </div> */}



            <div className={styles["content-container"]}>
                <div className={styles["container"]} style={{ display: "block", margin: "20px" }}>
                    <h2>エビングハウス メモ帳１</h2>
                    <p>{props.cookies.get("username")} さん</p>
                </div>

                {/* <div id={styles["menu2"]} style={{ border: "8px solid #339fff", backgroundColor: "rgba(50,100,150,0.2)" }}>
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
 */}           <div className={styles["memo-container"]}>

                    <CardButton titleText="復習" detailText1="(1,7,28日前)" href="/memo1/review" />
                    <CardButton titleText="ＡＬＬ" detailText1="" href="/memo1/all" />
                    <DrillCardButton titleText="メモ帳１ドリル" detailText1="" />
                </div>
            </div>
            <TagButton text="Input Memo1" width="20%" link="/" top="25%" backgroundColor="orange" color="rgba(50,50,50)" />
            <TagButton text="Edit Memo1 List" width="20%" link="/" top="35%" backgroundColor="orange" color="rgba(50,50,50)" />

            <TagButton text="logout" link="/" top="75%" backgroundColor="white" color="rgba(50,50,50)" logout={true} />

        </div>

    );
};

export default withCookies(Memo1);