import { Box, Button, TextField } from "@mui/material";
import type { KeyboardEventHandler } from "react";
import { useState } from "react";
import { useLoginUser } from "../hooks/useLoginUser";

export const Login = () => {
  const { login } = useLoginUser();
  const [name, setName] = useState("");

  const onKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      loginUser();
    }
  };

  function loginUser() {
    if (name) {
      login(name);
    }
  }

  return (
    <Box className="flex items-center justify-center h-screen">
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={onKeyDown}
        slotProps={{
          input: {
            endAdornment: (
              <Button
                size="small"
                variant="contained"
                disabled={!name}
                onClick={loginUser}
              >
                Join
              </Button>
            ),
          },
        }}
      />
    </Box>
  );
};
