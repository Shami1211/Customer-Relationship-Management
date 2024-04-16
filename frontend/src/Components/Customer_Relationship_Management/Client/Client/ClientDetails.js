import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const URL = "http://localhost:8080/clients";

const useStyles = makeStyles((theme) => ({
  clientDetails: {
    padding: theme.spacing(2),
  },
  actionAdminCon: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  searchBoxAdmin: {
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    marginRight: theme.spacing(2),
  },
  adminTopicClient: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  tableDetailsAdmin: {
    marginTop: theme.spacing(2),
  },
  alertNoResults: {
    marginBottom: theme.spacing(2),
  },
  btnDashAdmin: {
    marginRight: theme.spacing(2),
  },
  btnDashAdminDlt: {
    backgroundColor: "red",
    color: "white",
    border: "2px solid red",
    fontWeight: "bold",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#d32f2f",
      border: "2px solid #d32f2f",
    },
  },
}));

const ClientDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateDataMap, setUpdateDataMap] = useState({});
  const summaryRef = useRef();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URL);
      setClients(response.data.clients);
      const map = {};
      response.data.clients.forEach((client) => {
        map[client._id] = {
          id: client._id,
          name: client.name,
          bname: client.bname,
          email: client.email,
          contact: client.contact,
          address: client.address,
          tax: client.tax,
          rproject: client.rproject,
          cproject: client.cproject,
          total: client.total,
        };
      });
      setUpdateDataMap(map);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filteredClients = clients.filter((client) =>
      Object.values(client).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setClients(filteredClients);
    setNoResults(filteredClients.length === 0);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${URL}/${id}`, updateDataMap[id]);
      fetchClients();
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleChange = (newValue, id, name) => {
    setUpdateDataMap((prevMap) => ({
      ...prevMap,
      [id]: {
        ...prevMap[id],
        [name]: newValue,
      },
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedClients = clients.filter((client) => client._id !== id);
        setClients(updatedClients);
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
    documentTitle: "Client Document",
    onAfterPrint: () => alert("Successfully Downloaded!"),
    onClose: () => alert("Print canceled"),
  });

  return (
    <div className={classes.clientDetails}>
      <Typography variant="h1" className={classes.adminTopicClient}>
        Admin <span className="admin_sub_topic_client">Dashboard</span>
      </Typography>
      <div className={classes.actionAdminCon}>
        <div className={classes.searchBoxAdmin}>
          <TextField
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            className={classes.searchInput}
            placeholder="Search Clients"
          />
          <Button
            onClick={handleSearch}
            variant="contained"
            color="primary"
            className={classes.btnDashAdmin}
          >
            Search
          </Button>
        </div>
        <div>
          <Link to="/add-client">
            <Button variant="contained" color="primary" className={classes.btnDashAdmin}>
              Add Client
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            className={classes.btnDashAdmin}
            onClick={handlePrint}
          >
            Generate Report
          </Button>
        </div>
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper ref={summaryRef}>
          <Typography variant="h2" className={classes.adminTopicClient}>
            Client <span className="admin_sub_topic_client">Details</span>
          </Typography>
          {noResults && (
            <Alert severity="info" className={classes.alertNoResults}>
              No results found
            </Alert>
          )}
          <Table className={classes.tableDetailsAdmin}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Business Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Tax</TableCell>
                <TableCell>Recent Project</TableCell>
                <TableCell>Current Project</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client._id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.bname}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell>{client.tax}</TableCell>
                  <TableCell>{client.rproject}</TableCell>
                  <TableCell>{client.cproject}</TableCell>
                  <TableCell>{client.total}</TableCell>
                  <TableCell>
                    <Link to={`/updateclient/${client._id}`} className={classes.btnDashAdmin}>
                      Update
                    </Link>
                    <Button
                      className={classes.btnDashAdminDlt}
                      onClick={() => handleDelete(client._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </div>
  );
};

export default ClientDetails;
