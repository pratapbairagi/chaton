const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const PORT = 8080;
const { Server } = require("socket.io");
const cors = require("cors");
const uid = require("uuid").v4
const path = require("path");

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:3000", 
            "http://localhost:9877", 
            "https://chaton-test-server.vercel.app", 
            "https://chaton-test-client.vercel.app", 
            "wss://chaton-test-server.vercel.app", 
            "wss://chaton-test-client.vercel.app", 
            "wss://chaton-test-server.vercel.app/socket.io/?EIO=4&transport=websocket", 
            'https://chaton-test-server.vercel.app', 
            'wss://chaton-test-server.vercel.app',
            'https://chaton-test.onrender.com',
            'wss://chaton-test.onrender.com',
            "https://chaton-test.fly.dev",
            "wss://chaton-test.fly.dev"
        ],
        methods: ["GET", "POST"]
    }, transports: ["polling"]
    // path: "/socket.io/?EIO=4&transport=websocket"
})

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.use(cors());

app.use(express.static(path.join(__dirname, "./chatapp2/build")))
app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'chatapp2', 'build', 'index.html'))
});

// const __dirname1 = path.resolve();
// app.use(express.static(path.join(__dirname1, "/chatapp2/build")))
// app.get("*", (req, res)=>{
//     return res.sendFile(path.resolve(__dirname1, "chatapp2", "build", "index.html"))
// })

// app.get("/", (req, res)=>{
//     return res.send("working")
// })



let sessions = [];
let x = 0;

io.use(async (socket, next) => {


    let { userName, sessionId, userId } = socket.handshake.auth;

    if (userName && sessionId === undefined) {

        socket.userId = uid();
        socket.userName = userName,
            socket.connected = true,
            socket.sessionId = uid()
        next()
    }
    else if (sessionId) {
        if (!socket.userId) {

            socket.userName = userName;
            socket.sessionId = sessionId;
            socket.userId = userId;
            socket.connected = true;
            next()

        }
    }

})

function saveSession(session) {
    let isSessionExist = sessions.find(v => v.userId === session.userId);
    if (!isSessionExist) {
        sessions.push(session)
    };
};


const findSession = (id) => {
    return sessions.find(v => v.userId === id)
}
let messages = []

io.on("connection", (s) => {


    let session = {
        userId: s.userId,
        userName: s.userName,
        sessionId: s.sessionId,
        connected: s.connected
    }

    s.join(s.userId)
    if (findSession(s.userId) === undefined) {
        saveSession(session);
    }

    s.broadcast.emit("user", sessions)

    s.emit("users", { sessions: sessions, self: { userName: s.userName, userId: s.userId, sessionId: s.sessionId } });

    s.on("send private message", privateMessage => {

        messages.push(privateMessage)
        s.to(privateMessage.to).emit("receive private message", messages)
        s.emit("receive private message", messages)

        // x++

    })

    // if(x === 0 ){
    //     s.emit("receive private message", messages)
    //     console.log("x working", messages)
    // }

    s.on("disconnectUser", user => {
        let disconnectedUser = sessions.map(v => v.userId === user.userId ? { ...v, connected: false } : v)
        s.broadcast.emit("updateUsers_onDisconnect", disconnectedUser)

    })

    s.on("disconnect", async () => {


        let disconnectedUser = sessions.map(v => v.userId === s.userId ? { ...v, connected: false } : v)
        s.broadcast.emit("updateUsers_onDisconnect", disconnectedUser)

    })

})



server.listen(PORT, () => {
    console.log(`server connected at http://localhost:${8080}`)
})