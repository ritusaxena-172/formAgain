import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";

function HomePage() {
  const classes = useStyles();
  const history = useHistory();

  function handleClick() {
    history.push("/form");
  }
  return (
    <div>
      <Container className={clsx(classes.container)} fixed>
        <Typography
          component="div"
          style={{ backgroundColor: "#0da4db", height: "10vh" }}
        >
          With over 10 years of experience, we know how to thrive when remote
          working is the new standard.
        </Typography>
        <Button variant="outlined" color="primary" onClick={handleClick}>
          Contact Us
        </Button>
      </Container>
    </div>
  );
}

export default HomePage;

//"start": "react-scripts start",
