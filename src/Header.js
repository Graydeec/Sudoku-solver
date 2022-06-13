import React from "react";
import { makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";

function Header() {
  const classes = useStyle();
  return (
    <Paper className={classes.header}>
      <span>Soduku Solver</span>
    </Paper>
  );
}

export default Header;

const useStyle = makeStyles(() => ({
  header: {
    height: "60px",
    fontSize: "2rem",
    fontWeight: "700",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    width: "420px",
    backgroundColor: "silver",
    textTransform: "uppercase",
    fontFamily: "Verdana, sans-serif",
    borderRadius: "40%",
  },
}));
