import { useState } from "react";
import { Link } from "react-router-dom";


const Login = ({ socket, savedUserSession, submitUserNameHandler}) => {
    const [inputUserName, setInputUserName] = useState({ name: "" });

    // const submitUserNameHandler = () => {
    //     socket.auth = { userName: inputUserName.name }
    //     socket.connect()
    //   }

    // <input style={{ width: "260px", height: "24px", display: "block", margin: "auto", padding: "2px 6px" }} type='text' defaultValue={inputUserName.name} onChange={(e) => setInputUserName({ name: e.target.value })} />
    //           <button style={{ width: "60px", height: "24px", display: "block", margin: "auto", padding: "2px 6px" }} onClick={submitUserNameHandler}>submit</button>
    return (
        <div style={{ width: "100%", height: "100vh", display: "grid", placeItems: "center", backgroundColor: "#a99dff" }}>
            <div style={{ width: "90%", maxWidth: "300px", aspectRatio: "1/1.4", display: "flex", flexDirection: "column", backgroundColor:"whitesmoke" }} >
                <div style={{ width: "100%", height: "12%", fontSize: "140%", fontWeight: "600", lineHeight: "230%", backgroundColor: "#3D30A2", color: "white" }}>USER LOGIN</div>
                <div style={{ width: "100%", height: "24%", display:"grid", placeItems:"center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="grey" style={{height:"60%", backgroundColor:"#a99dff", padding:"6px", borderRadius:"10px", marginBottom:"-10%"}}>
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>

                </div>
                <div style={{ width: "100%", height: "16%", display:"flex", justifyContent:"center", alignItems:"flex-end" }}>
                    <input id="userNameInput" defaultValue={document.getElementById("userNameInput")?.value} placeholder="Enter Your Name" type="text" style={{display:"block", outline:"none", width:"78%", height:"70%", border:"2px solid grey", fontSize:"90%", padding:"2px 8px"}} />
                </div>
                <div style={{ width: "100%", height: "16%", display:"flex", justifyContent:"center", alignItems:"flex-end" }}>
                <input  placeholder="Enter Your Password" type="password" style={{display:"block", outline:"none", width:"78%", height:"70%", border:"2px solid grey", fontSize:"90%", padding:"2px 8px"}} />

                </div>
                <div style={{ width: "78%", height: "10%", margin:"0 auto", display:"flex" }}>
                    <div style={{width:"50%", height:"100%", display:"flex", flexDirection:"row", alignItems:"center", paddingLeft:"2%", gap:"6px"}}>
                        <input  type="checkbox" style={{color:"blueviolet"}} name="" id="t&c" />
                        <label htmlFor="t&c" style={{fontSize:"70%", color:"grey"}}>Remember me</label>
                    </div>

                    <div style={{width:"50%", height:"100%", display:"flex", flexDirection:"row", alignItems:"center", paddingRight:"2%", gap:"6px"}}>
                        <Link style={{fontSize:"70%", marginLeft:"auto", colorL:"grey"}}>Forget Password ?</Link>
                    </div>
                    

                </div>
                <div style={{ width: "100%", height: "14%", display:"flex", justifyContent:"center", alignItems:"flex-end" }}>
                    <button onClick={()=>submitUserNameHandler(document.getElementById("userNameInput").value)} style={{width:"78%", height:"75%", fontSize:"130%", fontWeight:"500", border:"none", backgroundColor:"#3D30A2", color:"grey"}}>Login</button>
                </div>
            </div>

        </div>
    )
};

export default Login;