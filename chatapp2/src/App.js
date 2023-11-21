import './App.css';
import { Route, BrowserRouter as Router, Routes, Link, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { io } from "socket.io-client";
import PrivateChat from './privateChat';
import Home from './pages/home';
import Login from './pages/login';
import ProtectedRoute from './protectedRoute/protectedRoute';
import NonProtectedRoute from './protectedRoute/nonProtectedRoute';
// const ENDPOINT = 'wss://chaton-test-server.vercel.app';
// const socket = io(`ws://${ENDPOINT}`, { transports: ['websocket', 'polling'], forceNew: true, autoConnect: false });
const ENDPOINT = 'https://chaton-test.fly.dev'
// const socket = io(ENDPOINT, { transports: [`websocket`, `polling`], forceNew : true, autoConnect : false, secure: true});
const socket = io(ENDPOINT, {transports:['polling', "websocket"], forceNew:true, autoConnect : false});

function App() {

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const submitUserNameHandler = (name) => {
    socket.auth = { userName: name }
    socket.connect()
  }

  useEffect(() => {
    socket.on("user", userSessions => {
      if (userSessions.length > users.length) {
        setUsers(userSessions)
      }
    })

    socket.on("users", userSession => {
      if (userSession.sessions.length > users.length) {
        console.log("users 2", userSession)
        setUsers(userSession.sessions)
        localStorage.setItem("userSession", JSON.stringify(userSession.self))
      }
    });

    socket.on("updateUsers_onDisconnect", updatedUsers_onDisconnect => {
      setUsers(updatedUsers_onDisconnect)
    });


    socket.on("receive private message", recPvtMsg => {
      console.log("rec pvt msg", recPvtMsg)
      setMessages(recPvtMsg)
      // }
      // else if( typeof messages === "object"){
      //     setMessages([recPvtMsg])
      // }

    })

  }, [socket]);


  let savedUserSession = localStorage.getItem("userSession")

  const isUserSessionSaved = useMemo(() => {

    if (savedUserSession !== undefined && savedUserSession !== null) {
      if (typeof socket.auth == 'undefined') {
        savedUserSession = JSON.parse(localStorage.getItem("userSession"));
        socket.auth = { sessionId: savedUserSession.sessionId, userId: savedUserSession.userId, userName: savedUserSession.userName };
        socket.connect();
      }

      return savedUserSession
    }

  }, [savedUserSession]);

  // const messageSubmitHandler = (e) => {
  //   socket.emit("send private message", e);

  // }


  const logoutUser = () => {
    socket.emit("disconnectUser", isUserSessionSaved)
    localStorage.removeItem("userSession")
    window.location = "/login"
  }

  // login



  return (

    <div className="App">
      <Router>

        <Routes>

          <Route path='/chat/:id' element={<PrivateChat socket={socket} messages={messages} setMessages={setMessages} />} />

          <Route element={<ProtectedRoute auth={isUserSessionSaved} />}>
            <Route path="/" element={<Home logoutUser={logoutUser} users={users} socket={socket} />} />
          </Route>

          <Route element={<NonProtectedRoute auth={isUserSessionSaved} />}>
            <Route path='/login' element={<Login submitUserNameHandler={submitUserNameHandler} />} />
          </Route>

        </Routes>

      </Router>
    </div>



  );
}

export default App;
