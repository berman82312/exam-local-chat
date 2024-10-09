import { Container } from "@mui/material";
import { ChatRoom } from "./components/ChatRoom";

function App() {
  return (
    <Container maxWidth="sm" component={"main"}>
      <ChatRoom />
    </Container>
  );
}

export default App;
