import { Container } from "@mui/material";
import { ChatRoom } from "./components/ChatRoom";
import { Login } from "./components/Login";
import { useUserStore } from "./stores/user";

function App() {
  const isLogin = useUserStore((state) => !!state.user);
  return (
    <Container maxWidth="sm" component={"main"}>
      {isLogin ? <ChatRoom /> : <Login />}
    </Container>
  );
}

export default App;
