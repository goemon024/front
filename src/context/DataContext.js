// import {withCookies} from 'react-cookie'

// const ApiContextProvider = (props) => {
//   const token = props.cookies.get('current-token')
//   const [profile,setProfile]=useState([])
//   const [profiles,setProfiles] = useState([])
//   const [editedProfile,setEditedProfile] = useState({id:'',nickName:''})
//   const [askList, setAskList] =useState([])
//   const [askListFull, setAskListFull]=useState([])
//   const [inbox,setInbox]= useState([])
//   const [cover, setCover] = useState([]) // 画像情報格納

// src/context/DataContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';     

// Contextの作成
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [cookies] = useCookies(['current-token']);  // useCookiesを使う
    const token = cookies['current-token'];           // useCookiesを使う

    const [wordTable, setWordTable] = useState([]);
    const [memo1Table, setMemo1Table] = useState([]);
    const [memo2Table, setMemo2Table] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const [res1, res2, res3 ] = await Promise.all([
                    axios.get('http://localhost:8000/api_word/word/',{
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }),
                    axios.get('http://localhost:8000/api_memo1/memo1/',{
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }),
                    axios.get('http://localhost:8000/api_memo2/memo2/',{
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }),
                ]);
                setWordTable(res1.data);
                setMemo1Table(res2.data);
                setMemo2Table(res3.data);

                console.log("READING CONTEXT");

                // setMemo2Table(res3.data);
            } catch (error) {
                console.error('データの取得に失敗しました:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);




    
    // table1を更新する関数
    // const updateTable1 = async (newData) => {
    //     try {
    //         const response = await axios.put(`/api/table1/${newData.id}/`, newData);
    //         setTable1((prevTable1) =>
    //             prevTable1.map((item) =>
    //                 item.id === newData.id ? response.data : item
    //             )
    //         );
    //     } catch (error) {
    //         console.error('データの更新に失敗しました:', error);
    //     }
    // };

    return (
        <DataContext.Provider value={{ 
            wordTable,
            setWordTable,
            memo1Table,
            setMemo1Table,
            memo2Table,
            setMemo2Table,
            loading,
            // updateTable1
        }}>
            {children}
        </DataContext.Provider>
    );
};



