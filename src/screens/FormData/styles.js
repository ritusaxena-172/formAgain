import { makeStyles, withStyles } from "@material-ui/core/styles";
import { deepOrange, deepPurple } from '@material-ui/core/colors';
export const useStyles = makeStyles((theme) => ({
  box: {
    position: "absolute",
    height: "50%",
    transform: "translate(0%, -100%)",
  },
  box1: {
    position: "absolute",
    height: "50%",
    transform: "translate(2950%, -10%)",
  },
  avatarDev: {
    width: 110,
    fontSize: 40,
    height: 110,
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  avatarDes: {
     width: 110,
    fontSize: 40,
    height: 110,
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  paper: {
    margin: "2%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
    width: "100%",
    height: "100%",
  },

  box2: {
    padding: "2%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
  },
  text: {
    padding: "1%",
  },
  inbox: {
    margin: "1%",
    paddingRight: "1%",
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
    width: "110%",
    height: "50%",
    // backgroundColor: "grey",
    borderRadius: "15px !important",
  },
  outbox: {
    paddingLeft: "1%",
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
    width: "110%",
    // height: "40%",
    // backgroundColor: "grey",
    borderRadius: "20px !important",
  },
  otherBox:{
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
    width: "110%",
    height: "50%",
  }
}));
