import { Send } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";

export const ChatMessageSender = () => {
  const [message, setMessage] = useState("");

  const onKeyDown: React.KeyboardEventHandler = function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setMessage("");
    }
  };

  return (
    <div className="p-4 border-t border-gray-400">
      <TextField
        fullWidth
        placeholder="Send a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        multiline
        onKeyDown={onKeyDown}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton>
                <Send />
              </IconButton>
            ),
          },
        }}
      />
    </div>
  );
};
