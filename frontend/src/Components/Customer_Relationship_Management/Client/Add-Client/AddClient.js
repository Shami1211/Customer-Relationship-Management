import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  adminTopicClient: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "10px 0",
    textTransform: "capitalize",
    fontSize: 35,
  },
  itemFullBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "25px 0",
  },
  itemFormAdmin: {
    border: "2px solid #2196f3",
    padding: 25,
    borderRadius: 5,
    width: 450,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  },
  formBoxItemLabel: {
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 18,
  },
  formBoxItemInput: {
    width: "100%",
    fontSize: 17,
    padding: "8px",
    borderRadius: 3,
    margin: "8px 0",
    border: "1.5px solid #2196f3",
  },
  adminFormCenterBtn: {
    backgroundColor: "#2196f3",
    color: "white",
    border: "2px solid #2196f3",
    fontSize: 20,
    cursor: "pointer",
    borderRadius: 3,
    padding: "8px 16px",
    textDecoration: "none",
    fontWeight: "bold",
    margin: "20px auto 0 auto",
    display: "flex",
    textTransform: "capitalize",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  },
}));

function AddClient() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    bname: "",
    email: "",
    contact: "",
    address: "",
    tax: 0,
    rproject: "",
    cproject: "",
    total: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputs.name ||
      !inputs.bname ||
      !inputs.email ||
      !inputs.contact ||
      !inputs.address ||
      !inputs.tax ||
      !inputs.rproject ||
      !inputs.cproject ||
      !inputs.total
    ) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/clients", inputs);
      showAlert("Client added successfully!");
      navigate("/client-details");
    } catch (error) {
      console.error("Error adding client:", error);
      showAlert("Error adding client. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  return (
    <div>
      <Typography variant="h1" className={classes.adminTopicClient}>
        Add <span className="client-us">Client</span>
      </Typography>
      <div className={classes.itemFullBox}>
        <form onSubmit={handleSubmit} className={classes.itemFormAdmin}>
          {/* Input fields for client information */}
          {/* Name */}
          <label className={classes.formBoxItemLabel}>Name</label>
          <br />
          <TextField
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            variant="outlined"
            className={classes.formBoxItemInput}
            required
          />
          <br />

          {/* Business Name */}
          <label className={classes.formBoxItemLabel}>Business Name</label>
          <br />
          <TextField
            type="text"
            name="bname"
            value={inputs.bname}
            onChange={handleChange}
            variant="outlined"
            className={classes.formBoxItemInput}
            required
          />
          <br />

          {/* Email */}
          <label className={classes.formBoxItemLabel}>Email</label>
          <br />
          <TextField
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            variant="outlined"
            className={classes.formBoxItemInput}
            required
          />
          <br />

          {/* Contact */}
          <label className={classes.formBoxItemLabel}>Contact</label>
          <br />
          <TextField
            type="text"
            name="contact"
            value={inputs.contact}
            onChange={handleChange}
            variant="outlined"
            className={classes.formBoxItemInput}
            required
          />
          <br />

          {/* Address */}
          <label className={classes.formBoxItemLabel}>Address</label>
          <br />
          <TextField
            type="text"
            name="address"
            value={inputs.address}
            onChange={handleChange}
            variant="outlined"
            className={classes.formBoxItemInput}
            required
          />
          <br />

          {/* Tax */}
          <label className={classes.formBoxItemLabel}>Tax</label>
          <br />
          <TextField
            type="number"
            name="tax"
            value={inputs.tax}
            onChange={handleChange}
            variant="outlined"
            className={classes.formBoxItemInput}
            required
          />
          <br />

          {/* Recent Project */}
          <label className={classes.formBoxItemLabel}>Recent Project</label>
          <br />
          <TextField
            type="text"
            name="rproject"
            value={inputs.rproject}
            onChange={handleChange}
            variant="outlined"
            className={classes.formBoxItemInput}
            required
          />
          <br />

          {/* Current Project */}
          <label className={classes.formBoxItemLabel}>Current Project</label>
          <br />
          <TextField
            type="text"
            name="cproject"
            value={inputs.cproject}
            onChange={handleChange}
            variant="outlined"
            className={classes.formBoxItemInput}
            required
          />
          <br />

          {/* Total */}
          <label className={classes.formBoxItemLabel}>Total</label>
          <br />
          <TextField
            type="number"
            name="total"
            value={inputs.total}
            onChange={handleChange}
            variant="outlined"
            className={classes.formBoxItemInput}
            required
          />
          <br />

          <Button type="submit" className={classes.adminFormCenterBtn}>
            Add Client
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddClient;
