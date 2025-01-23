import React, { createContext, useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';     
// import API_URL from '../config';

// Contextの作成
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [cookies] = useCookies(['current-token']);  // useCookiesを使う
    const token = cookies['current-token'];           // useCookiesを使う

    const [wordTable, setWordTable] = useState([]);
    const [memo1Table, setMemo1Table] = useState([]);
    const [memo2Table, setMemo2Table] = useState([]);
    const [sentenceTable, setSentenceTable] = useState([]);

    const [userName, setUserName] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshWordTable = async () => {
        try {
            const response = await axios.get(`/api_word/word/`, {
            headers: { 'Authorization': `Token ${token}` }
            });
            setWordTable(response.data);
                } catch (error) {
                    console.error('単語テーブルの更新に失敗しました:', error);
            }
        };
        
    const refreshSentenceTable = async () => {
        try {
                const response = await axios.get(`/api_word/sentence/`, {
                headers: { 'Authorization': `Token ${token}` }
            });
            setSentenceTable(response.data);
            } catch (error) {
                console.error('例文テーブルの更新に失敗しました:', error);
            }
        };
        
        
    const refreshMemo1Table = async () => {
        try {
            const response = await axios.get(`/api_memo1/memo1/`, {
                headers: { 'Authorization': `Token ${token}` }
            });
            setMemo1Table(response.data);
            } catch (error) {
            console.error('メモ1テーブルの更新に失敗しました:', error);
            }
        };
        
    const refreshMemo2Table = async () => {
        try {
            const response = await axios.get(`/api_memo2/memo2/`, {
                headers: { 'Authorization': `Token ${token}` }
            });
            setMemo2Table(response.data);
            } catch (error) {
            console.error('メモ2テーブルの更新に失敗しました:', error);
            }
        };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    refreshWordTable(),
                    refreshSentenceTable(),
                    refreshMemo1Table(),
                    refreshMemo2Table(),
                ]);
            } finally {
                setLoading(false);
            }
        }
            fetchData();
            }, []);

            // try {

            //     const [res1, res2, res3, res4 ] = await Promise.all([
            //         // axios.get(`${API_URL}/api_word/word/`,{
            //         axios.get(`/api_word/word/`,{
            //             headers: {
            //                 'Authorization': `Token ${token}`
            //             }
            //         }),
            //         // axios.get(`${API_URL}/api_memo1/memo1/`,{
            //         axios.get(`/api_memo1/memo1/`,{
            //             headers: {
            //                 'Authorization': `Token ${token}`
            //             }
            //         }),
            //         // axios.get(`${API_URL}/api_memo2/memo2/`,{
            //         axios.get(`/api_memo2/memo2/`,{
            //             headers: {
            //                 'Authorization': `Token ${token}`
            //             }
            //         }),
            //         axios.get(`/api_word/sentence/`,{
            //             headers: {
            //                 'Authorization': `Token ${token}`
            //             }
            //         }),
            //     ]);
    //             setWordTable(res1.data);
    //             setMemo1Table(res2.data);
    //             setMemo2Table(res3.data);
    //             setSentenceTable(res4.data);

    //             console.log("READING CONTEXT");

    //             // setMemo2Table(res3.data);
    //         } catch (error) {
    //             console.error('データの取得に失敗しました:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);


    return (
        <DataContext.Provider value={{ 
            wordTable,
            setWordTable,
            memo1Table,
            setMemo1Table,
            memo2Table,
            setMemo2Table,
            sentenceTable,
            setSentenceTable,
            loading,
            userName,
            setUserName,
            // updateTable1
        }}>
        <Suspense>
            {children}
        </Suspense>
        </DataContext.Provider>
    );
};

// export const useDataContext = () => {
//     return useContext(DataContext);
// };
