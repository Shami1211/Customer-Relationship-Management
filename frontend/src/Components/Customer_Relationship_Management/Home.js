import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  boxConTest: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 35,
    fontFamily: "Roboto, sans-serif",
    height: "90vh",
  },
  boxHomeTest: {
    backgroundColor: "#2196f3",
    fontSize: 25,
    width: 200,
    color: "white",
    border: "3px solid #2196f3",
    borderRadius: 8,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "white",
      border: "3px solid #2196f3",
      color: "#2196f3",
    },
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.boxConTest}>
      <Button
        component={Link}
        to="/client-details"
        className={classes.boxHomeTest}
      >
        <h3>Clients</h3>
      </Button>

      <Button
        component={Link}
        to="/supplier-details"
        className={classes.boxHomeTest}
      >
        <h3>Suppliers</h3>
      </Button>
    </div>
  );
}
