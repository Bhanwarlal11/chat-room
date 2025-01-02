// import React from "react";
// import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

// const Sidebar = () => {
//   return (
//     <Box
//       sx={{
//         bgcolor: "#f0f0f0",
//         p: 2,
//         borderRight: "1px solid #ddd",
//         height: "100%",
//       }}
//     >
//       <Typography variant="h6" gutterBottom>
//         Joined Rooms
//       </Typography>
//       <List sx={{ mb: 3 }}>
//         <ListItem>
//           <ListItemText primary="Room 1" />
//         </ListItem>
//         <ListItem>
//           <ListItemText primary="Room 2" />
//         </ListItem>
//       </List>

//       <Typography variant="h6" gutterBottom >
//         Available Rooms
//       </Typography>
//       <List>
//         <ListItem>
//           <ListItemText primary="Room 3" />
//         </ListItem>
//         <ListItem>
//           <ListItemText primary="Room 4" />
//         </ListItem>
//       </List>
//     </Box>
//   );
// };

// export default Sidebar;


import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = ({ rooms }) => {
  return (
    <Box
      sx={{
        bgcolor: "#f0f0f0",
        p: 2,
        borderRight: "1px solid #ddd",
        height: "100%",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Joined Rooms
      </Typography>
      <List sx={{ mb: 3 }}>
        {rooms.map((room) => (
          <ListItem key={room.id} component={Link} to={`/chat/${room.id}`}>
            <ListItemText primary={room.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
