import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Home = ({  users, logoutUser }) => {


    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#a99dff" }}>
            <div style={{ width: "100%", height: "8vh", display: "flex", flexDirection: "row", backgroundColor: "#3D30A2", border: "2px solid transparent" }}>
                <div style={{ width: "20%", height: "100%", display: "grid", placeItems: "center", fontWeight: "500", color: "whitesmoke" }}>
                    <svg onClick={ logoutUser} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ height: "70%", cursor: "pointer" }}>
                        <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>

                </div>
                <div style={{ width: "60%", height: "100%", display: "grid", placeItems: "center", fontWeight: "500", color: "whitesmoke" }}>
                    <input id="messageInput" placeholder="Search name..." type="text" style={{ display: "block", padding: "4px 10px", width: "80%", height: "5vh", marginLeft: "auto", border: "none", outline: "none", backgroundColor: "#5449a9", fontSize: "14px", color: "whitesmoke" }} />

                </div>
                <div style={{ width: "20%", height: "100%", display: "grid", placeItems: "center", fontWeight: "500", color: "whitesmoke" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ height: "70%" }}>
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                    </svg>
                </div>

            </div>
            <div style={{ width: "100%", height: "8vh", display: "flex", flexDirection: "row", backgroundColor: "#3D30A2", border: "2px solid transparent" }}>
                <div style={{ width: "33.33%", height: "100%", display: "grid", placeItems: "center", fontWeight: "500", color: "whitesmoke" }}> Users </div>
                <div style={{ width: "33.33%", height: "100%", display: "grid", placeItems: "center", fontWeight: "500", color: "whitesmoke" }}> Groups </div>
                <div style={{ width: "33.33%", height: "100%", display: "grid", placeItems: "center", fontWeight: "500", color: "whitesmoke" }}> Extra </div>
            </div>
            <div style={{ width: "100%", height: "calc( 100% - 8vh)", maxheight: "calc( 100% - 8vh)", overflowY: "auto", display: "flex", flexDirection: "column" }}>
                <div style={{ height: "100%", maxHeight: "100%", overflowY: "auto" }}>



                    <div style={{ width: "100%", height: "max-content", minHeight: "70vh", display: "flex", flexDirection: "column" }}>
                        {localStorage.getItem("userSession") && users?.map((u, i) => {
                            return <Link to={`/chat/${[u.userId, JSON.parse(localStorage.getItem("userSession")).userId].sort().toLocaleString().replace(",", "")}`} state={{ toUserName: u.userName, toUserId: u.userId }} key={u.userId} style={{ width: "100%", height: "24px", padding: "5px 5px 5px 10px", height: "11vh", display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: `${i % 2 === 0 ? "#a99dff" : "#998df6"}` }}>
                                <div style={{ height: "80%", aspectRatio: "1/1", borderRadius: "50%", padding: "5px", position: "relative", backgroundColor: "whitesmoke" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="grey" style={{ height: "100%" }}>
                                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                    </svg>
                                    <span style={{ width: "16px", height: "16px", display: "block", background: `${u.connected ? "green" : "red"}`, borderRadius: "50%", position: "absolute", right: "0", bottom: "0" }}></span>
                                </div>

                                <div style={{ width: "65%", height: "80%", display: "flex", flexWrap: "wrap", padding: "0 10px" }}>
                                    <div style={{ width: "100%", height: "50%", maxWidth: "100%", wordWrap: "break-word", fontSize: "14px", color: " rgb(87, 86, 86)", fontWeight: "500", textAlign: "left", display:"flex", alignItems:"center" }}>New Message... <span style={{display:"block", width:"max-content", padding:"4px 8px", backgroundColor:'red', color:"whitesmoke", marginLeft:"14px", lineHeight:"15px"}}>NEW</span> </div>
                                    <span style={{ width: "max-content", maxWidth: "40%", fontSize: "16px", fontWeight: "700", color: "#3D30A2", lineHeight: "18px" }}>{u.userName}</span>
                                    <span style={{ width: "max-content", maxWidth: "60%", fontSize: "12px", fontWeight: "500", color: "rgb(107, 107, 107)", whiteSpace: "nowrap", marginLeft: "auto", lineHeight: "24px" }}>10:00 pm, 17/12/2023</span>
                                </div>

                                {/* <span style={{ width: "10px", height: "10px", display: "block", background: `${u.connected ? "green" : "red"}`, borderRadius: "50%" }}></span> */}
                            </Link>
                            //  return <Link to={`/chat/${u.userId}`} state={{toUserName : u.userName, toUserId: u.userId}} key={u.userId} style={{ width: "100%", height: "24px", padding:"0 10%" }}>{u.userName} <span style={{width:"10px", height:"10px", display:"block", background:`${u.connected ? "green" : "red"}`, borderRadius:"50%"}}></span></Link>

                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home;