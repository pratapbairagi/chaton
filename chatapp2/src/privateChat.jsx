import { memo, useCallback, useEffect, useState } from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const PrivateChat = ({messages, setMessages, messageSubmitHandler, socket}) => {
    const {id} = useParams();
    const {state} = useLocation();

    function messageSubmitHandler(e){

        socket.emit("send private message", e)
        document.getElementById("messageInput").value = ""
        
    }

    const backToPrevPage = useNavigate()

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "0"}}>
            <header style={{ width: "100%", height: "9vh", display: "flex", alignItems: "center", padding: "0 1vh", margin: "0", backgroundColor:"#3D30A2", marginTop:"-2px" }}>

                <div onClick={()=> backToPrevPage(-1)} style={{ height: "6vh", width: "6vh", cursor:"pointer", marginRight: ".5vh", display: "grid", placeItems: "center", backgroundColor:"transparent" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" style={{ height: "5vh" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </div>

                <div style={{ height: "8vh", width: "calc(100% - 22vh)" }}>
                    <span id="secondUserName" style={{width:"max-content", maxWidth:"30vw", height:"8vh", display:"block", minWidth:"60px", lineHeight:"7vh", fontSize:"18px", padding:"2px 5px", color:"whitesmoke", fontWeight:"500", letterSpacing:"1px"}}>{state.toUserName}</span>
                </div>

                <div style={{ height: "6vh", width: "14vh", display: "flex", placeItems: "center", justifyContent: "space-between" }}>
                    <button style={{ height: "6vh", width: "6vh", padding: "3px", backgroundColor:"#5449a9", border:"none" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="whitesmoke" style={{ height: "5vh" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                    <button style={{ height: "6vh", width: "6vh", padding: "3px", display: "grid", placeItems: "center", backgroundColor:"#5449a9", border:"none" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="whitesmoke" style={{ height: "5vh" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </header>

            <div style={{ width: "100%", height: "calc(100vh - 19vh)", display:"flex", maxHeight:"calc(100vh - 19vh)", overflowY:"auto", flexDirection:"column", padding:"4px", backgroundColor:"#a99dff" }}>
                {   messages.map((m,i)=>{
                   return id.includes(m.to) && id.includes(m.from) && <div key={m.messageId} style={{width:"max-content", maxWidth:"70%", fontSize:"14px", minWidth:"80px", padding:"10px 8px 5px 8px", alignSelf:`${m.to === state.toUserId ? "flex-end" : "flex-start"}`, backgroundColor:`${m.to === state.toUserId ? "#513ded": "#3D30A2"}`, marginTop:"10px", color:"whitesmoke", letterSpacing:"1px", borderRadius:"8px", borderTopLeftRadius:`${m.to === state.toUserId ? "8px" : "0"}`, borderTopRightRadius:`${m.to === state.toUserId ? "0" : "8px"}`, display:"flex", flexDirection:"column"}}> 
                   <div style={{width:"100%", backgroundColor:`${m.to === state.toUserId ? "#4032ab7d": "#3D30A2"}`, textAlign:"left", wordBreak:"break-word", padding:"2px 0 4px 5px"}}>{m.message}</div>
                   
                   <div style={{ display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"4px", gap:"6px"}}>
                    <div style={{fontSize:"10px", width:"max-content", color:"white", padding:"0 0 2px 2px"}}>{m.to !== state.toUserId? state.toUserName : "you" }</div>
                    <div style={{fontSize:"8px", width:"max-content", color:"white", padding:"0 0 2px 2px", lineHeight:"15px"}}>10:45 pm, 31/12/2023</div>
                    
                    </div>
                    </div>
                })}
            </div>

            <div style={{ width: "100%", height: "10vh", display: "flex", placeItems: "center", padding: "0 1.3vh", backgroundColor:"#3D30A2" }}>
                <div style={{ height: "7vh", width: "7vh" }}>
                    <button style={{ height: "7vh", cursor:"pointer", width: "7vh", padding: "0", backgroundColor:"#5449a9", border:"none", padding:"2px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </button>
                </div>

                <div style={{ height: "7v", width: "calc(100% - 23vh)" }}>
                    {/* <input id="messageInput" onChange={(e)=> setMessageInput({message : e.target.value, to : id, from : localStorage.getItem("userSession") ? JSON.parse(localStorage.getItem("userSession")).userId : "" })} placeholder="Type message..." type="text" style={{ display: "block", padding: "4px 10px", width: "90%", height: "7vh", marginLeft: "auto", border: "none", outline: "none" }} /> */}
                    <input id="messageInput" placeholder="Type message..." type="text" style={{ display: "block", padding: "4px 10px", width: "98%", height: "7vh", marginLeft: "auto", border: "none", outline: "none", backgroundColor:"#5449a9", fontSize:"14px", color:"whitesmoke" }} />
                
                </div>

                <div style={{ height: "7vh", width: "16vh", display: "flex", placeItems: "center", justifyContent: "space-between" }}>
                    <button onClick={()=>messageSubmitHandler({message : document.getElementById("messageInput").value, to : state.toUserId, from : localStorage.getItem("userSession") ? JSON.parse(localStorage.getItem("userSession")).userId : "", messageId : uuidv4()})} style={{ height: "7vh", width: "7vh", padding: "0", backgroundColor:"#5449a9", border:"none", cursor:"pointer" }}>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" style={{ height: "5vh" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>

                    </button>
                    <button style={{ height: "7vh", cursor:"pointer", width: "7vh", padding: "0", display: "grid", placeItems: "center", backgroundColor:"#5449a9", border:"none" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" style={{ height: "5vh" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default memo(PrivateChat)