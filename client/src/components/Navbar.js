// import React from "react";
// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
// import { useAuth } from "../context/authContext";

// const Navbar = () => {

//   const {user} = useAuth();

//   return (
//     <AppBar position="static">
//       <Toolbar sx={{ justifyContent: "space-between" }}>
//         <Typography variant="h6">CHAT-ROOM</Typography>
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Typography variant="body1" sx={{ mr: 2 }}>
//             {user.name || "user"}
//           </Typography>
//           <Button variant="contained" color="secondary">
//             Logout
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../context/authContext";
import CreateRoomDialog from "./CreateRoomDialog"; // Import the dialog component

const Navbar = () => {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog visibility

  // Function to open the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">CHAT-ROOM</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user.name || "user"}
          </Typography>
          <Button variant="contained" color="secondary">
            Logout
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            sx={{ ml: 2 }}
          >
            Create Room
          </Button>
        </Box>
      </Toolbar>

      {/* Dialog component */}
      <CreateRoomDialog open={openDialog} onClose={handleCloseDialog} />
    </AppBar>
  );
};

export default Navbar;
