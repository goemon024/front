import React,{createContext,useState,useEffect} from 'react'
import {withCookies} from 'react-cookie'
import axios from 'axios'
export const ApiContext = createContext()

const ApiContextProvider = (props) => {
  const token = props.cookies.get('current-token')
  const [profile,setProfile]=useState([])
  const [profiles,setProfiles] = useState([])
  const [editedProfile,setEditedProfile] = useState({id:'',nickName:''})
  const [askList, setAskList] =useState([])
  const [askListFull, setAskListFull]=useState([])
  const [inbox,setInbox]= useState([])
  const [cover, setCover] = useState([]) // 画像情報格納

  useEffect(()=>{
    const getMyProfile =async()=>{
        try{
            const resmy = await axios.get('http://localhost:8000/api/user/myprofile/',{
                headers:{
                    'Authorization':`Token ${token}`
                }
            })
            const res   = await axios.get('http://localhost:8000/api/user/approval/',{
                headers:{
                    'Authorization':`Token ${token}`
                }
            })
            resmy.data[0] && setProfile(resmy.data[0])
            resmy.data[0] && setEditedProfile({id:resmy.data[0].id,nickname: resmy.data[0].nickname})
            resmy.data[0] && setAskList(res.data.filter(ask=>{return resmy.data[0].userPro=== ask.askTo}))
            setAskListFull(res.data)
        }
        catch{
            console.log('error')
        }
    }

    const getProfile = async() => {
        try {
            const res = await axios.get('http://localhost:8000/api/user/profile/',{
            headers:{
                'Authorization': `Token ${token}`
            }
            })
        setProfiles(res.data)}
        catch(error){
            console.log('get profile error',error)
        }
        }

    const getInbox = async()=>{
        try{
            const res = await axios.get('http://localhost:8000/api/dm/inbox/',{
                headers:{
                    'Authorization' : `Token ${token}`
                }
            })
            setInbox(res.data)}
        catch(error){
            console.log('inbox error',error)
        }
        }
        getMyProfile()
        getProfile()
        getInbox()
    },[token, profile.id])
    



    const createProfile = async()=>{
        const createData = new FormData()
        createData.append('nickName', editedProfile.nickName)
        cover.name && createData.append('img',cover, cover.name)

        // if (cover && cover instanceof File) {
        //     createData.append("img", cover, cover.name);
        //   } else {
        //     console.error("Cover is not a valid file object.");
        //   }
        
        try{
            console.log("createData:", createData)
            console.log("COVER NAME :",cover.name)
            const res =await axios.post('http://localhost:8000/api/user/profile/',createData,{
                headers:{
                    // 'Content-Type':'application/json',  //これがあるからエラー
                    'Authorization': `Token ${token}`
                }
            })
            setProfile(res.data)
            setEditedProfile({id: res.data.id,nickName: res.data.nickName})

        }
        catch(error){
            console.log("Error creating profile:", error)
            if (error.response && error.response.data) {
                console.log("Server response data:", error.response.data); // エラーメッセージを出力
            }
        }
    }

    const deleteProfile = async()=>{
        try{
            await axios.delete(`http://localhost:8000/api/user/profile/${profile.id}/`,{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            setProfiles(profiles.filter(dev=> dev.id !== profile.id))
            setProfiles([])
            setEditedProfile({id: '',nickName: ''})
            setCover([])
            setAskList([])
        }
        catch{
            console.log("error")
        }
    }

    const editProfile = async() =>{
        const editData = new FormData()
        editData.append('nickName', editedProfile.nickName)
        cover.name && editData.append('img',cover,cover.name)

        try{
            console.log("PROFILE:",profile)
            const res = await axios.put(`http://localhost:8000/api/user/profile/${profile.id}/`,
                editData,{headers:{
                    // 'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            setProfile(res.data)
        }
        catch(error){
            if (error.response) {
                console.log("Response error data:", error.response.data);
                console.log("Response status:", error.response.status);
              } else {
                console.log("Error", error.message);
              }
        }
    }

    

    // 友達申請を作る関数
    const newRequestFriend = async(askData) => {
        try{
            console.log(`Token ${token}`)
            const res= await axios.post('http://localhost:8000/api/user/approval/',askData,{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${token}`,
                }
            })
            setAskListFull([...askListFull, res.data])
        }
        catch(error){
            if (error.response) {
                console.log("Response error data:", error.response.data);
                console.log("Response status:", error.response.status);
              } else {
                console.log("Error", error.message);
              }
        }
    }


    const sendDMCont = async(uploadDM) =>{
        try{
            await axios.post('http://localhost:8000/api/dm/message/' , uploadDM,{
                headers:{
                    'Content-Type':'application/JSON',
                    'Authorization': `Token ${token}`,
                }
            })
        }
            catch(error){
                console.log("SendDM Error")
                if (error.response) {
                    console.error("Response error data:", error.response.data);  // サーバーのエラーメッセージ
                    console.error("Response status:", error.response.status);
                }
            }
        }

    const changeApprovalRequest = async(uploadDataAsk, ask)=>{
        try{
            const res = await axios.put(`http://localhost:8000/api/user/approval/${ask.id}/`,
                uploadDataAsk,{
                headers:{
                    'Content-Type':'application/JSON',
                    'Authorization': `Token ${token}`
                }
            })
            setAskList(askList.map(item=>(item.id===ask.id ? res.data:item)))
            const newDataAsk = new FormData()
            newDataAsk.append('askTo', ask.askFrom)
            newDataAsk.append("approved",true)

            const newDataAskPut = new FormData()
            newDataAskPut.append("askTo",ask.askFrom)
            newDataAskPut.append('askFrom', ask.askTo)
            newDataAskPut.append('approved',true)

            // 友達申請システムの、反対のオブジェクトが存在するかどうか判定する。
            // ask from と ask toが同時にできていないかどうか？
            const resp = askListFull.filter(item=>{return (item.askFrom===profile.userPro && item.askTo === ask.askFrom)})

            !resp[0] ?
            await axios.put(`http://localhost:8000/api/user/approval/`,newDataAsk,{
                headers:{
                    'Content-Type':'application/JSON',
                    'Authorization': `Token ${token}`
                }
            }):
            await axios.put(`http://localhost:8000/api/user/approval/${resp[0].id}/`,
                newDataAskPut,{
                headers:{
                    'Content-Type':'application/JSON',
                    'Authorization': `Token ${token}`
                }
            })
        }
        catch(error){
            // console.log('error')
            if (error.response) {
                console.log("Response error data:", error.response.data);
                console.log("Response status:", error.response.status);
              } else {
                console.log("Error", error.message);
              }
        }
    }
    
  
  return (
    <ApiContext.Provider value={{
        profile,
        profiles,
        cover,
        setCover,
        askList,
        askListFull,
        inbox,
        newRequestFriend,
        createProfile,
        editProfile,
        deleteProfile,
        changeApprovalRequest,
        sendDMCont,
        editedProfile,
        setEditedProfile,
    }}>
        {props.children}
    </ApiContext.Provider>
  )
}

export default withCookies(ApiContextProvider)