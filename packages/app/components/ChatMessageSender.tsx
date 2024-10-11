import { Send } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useChatMessage } from "../hooks/useChatMessage";
import { useLoginUser } from "../hooks/useLoginUser";

export const ChatMessageSender = () => {
  const [message, setMessage] = useState("");
  const { send } = useChatMessage();
  const { user } = useLoginUser();

  const onKeyDown: React.KeyboardEventHandler = function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  function sendMessage() {
    const isEmpty = !message.trim();
    if (!isEmpty) {
      send(user!, message);
    }
    setMessage("");
  }

  return (
    <div className="p-4 border-t border-gray-400">
      <TextField
        fullWidth
        placeholder="Send a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        multiline
        maxRows={5}
        onKeyDown={onKeyDown}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton onClick={sendMessage}>
                <Send />
              </IconButton>
            ),
          },
        }}
      />
    </div>
  );
};
