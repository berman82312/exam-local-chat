import { Container } from "@mui/material";
import { useEffect } from "react";
import { ChatRoom } from "./components/ChatRoom";
import { Login } from "./components/Login";
import { useLoginUser } from "./hooks/useLoginUser";
import { windowListener } from "./lib/windowListener";

function App() {
  const { user, logout } = useLoginUser();

  useEffect(() => {
    const unsubscribe = windowListener.onLeaving(() => {
      if (user) {
        logout(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, logout]);

  const isLogin = !!user;

  return (
    <Container maxWidth="sm" component={"main"}>
      <ChatRoom />
      {!isLogin && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black">
          <Login />
        </div>
      )}
    </Container>
  );
}

export default App;
