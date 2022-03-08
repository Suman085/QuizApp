import { Server } from "socket.io";
import http from "http";
import {
  addUser,
  getAllUsers,
  updateUserStatus,
  removeUser,
  getCurrentUser,
} from "./users";
import { v5 } from "uuid";

// Note: manage connections... not users. :D
const server = http
  .createServer((req) => {
    console.log("new request", req);
  })
  .listen(process.env.PORT || 3000);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.quizId).emit("allUsers", { users: getAllUsers(user.quizId) });
    }
  });
  socket.on("logout", () => {
    const user = removeUser(socket.id);
    if (user) {
      socket.leave(user.quizId);
      io.to(user.quizId).emit("allUsers", { users: getAllUsers(user.quizId) });
    }
  });
  socket.on("login", ({ username, quizId, avatar, topic }) => {
    addUser({
      id: socket.id,
      username,
      quizId,
      avatar,
      status: "Waiting",
      topic,
    });
    socket.join(quizId);
    io.to(quizId).emit("allUsers", { users: getAllUsers(quizId) });
  });
  socket.on("loadUsers", () => {
    const user = getCurrentUser(socket.id);
    if (user) socket.emit("allUsers", { users: getAllUsers(user.quizId) });
  });
  socket.on("readyForQuiz", () => {
    const user = updateUserStatus(socket.id, { status: "Ready" });
    if (user)
      io.to(user.quizId).emit("allUsers", { users: getAllUsers(user.quizId) });
  });
  socket.on("waitForQuiz", () => {
    const user = updateUserStatus(socket.id, { status: "Waiting" });
    if (user)
      io.to(user.quizId).emit("allUsers", { users: getAllUsers(user.quizId) });
  });
});

server.listen(8000, () => {
  console.log("listening on *:8000");
});
