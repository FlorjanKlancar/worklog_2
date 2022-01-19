import {useState, Fragment} from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function MiuiDrawer() {
  const [state, setState] = useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({...state, [anchor]: open});
  };

  const list = (anchor) => (
    <Box
      sx={{width: anchor === "top"}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          {text: "Home", icon: <HomeIcon />},
          {text: "Working hours", icon: <AccessTimeIcon />},
          {text: "Money spent", icon: <AttachMoneyIcon />},
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Fragment>
      <MenuOutlinedIcon onClick={toggleDrawer("top", true)} fontSize="large" />
      <SwipeableDrawer
        anchor={"top"}
        open={state["top"]}
        onClose={toggleDrawer("top", false)}
        onOpen={toggleDrawer("top", true)}
      >
        {list("top")}
      </SwipeableDrawer>
    </Fragment>
  );
}
