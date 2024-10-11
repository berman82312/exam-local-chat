import { Container } from "@mui/material";
import { ChatRoom } from "./components/ChatRoom";
import { Login } from "./components/Login";
import { useLoginUser } from "./hooks/useLoginUser";

function App() {
  const { isLogin } = useLoginUser();
  return (
    <Container maxWidth="sm" component={"main"}>
      {isLogin ? <ChatRoom /> : <Login />}
    </Container>
  );
}

export default App;
