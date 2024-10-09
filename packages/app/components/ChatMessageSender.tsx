import { Send } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";

export const ChatMessageSender = () => {
  return (
    <div className="p-4 border-t border-gray-400">
      <TextField
        fullWidth
        placeholder="Send a message..."
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
