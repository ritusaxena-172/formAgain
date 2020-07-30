import React, { useEffect } from "react";
import { Box, Paper, Grid } from "@material-ui/core";
import { useStyles } from "./styles";
import { withRouter } from "react-router";
import { Fade, Bounce } from "react-awesome-reveal";
import clsx from "clsx";
import { firestore } from "../../config/Firebase/firebase";
import "firebase/firestore";
import TimerIcon from '@material-ui/icons/Timer';
import FormControllabel from "../components/FormControllabel";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import Typography from "material-ui/styles/typography";
import BusinessIcon from "@material-ui/icons/Business";
import EmailIcon from "@material-ui/icons/Email";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DateRangeIcon from '@material-ui/icons/DateRange';
import PeopleIcon from "@material-ui/icons/People";
import { useHistory } from "react-router-dom";
import {useTransition,animated} from 'react-spring';
import { keys } from "@material-ui/core/styles/createBreakpoints";
 function FormData() {
  const classes = useStyles();
  var [call,setCall]=React.useState()
  const [devList, setDevList] = React.useState([]);
  const [desList, setDesList] = React.useState([]);
  const [show, setShow] = React.useState(false);
  useEffect(() => {
    dataFromFirebase();
  }, [call]);
  const history=useHistory()
  const dataFromFirebase = async () => {
    const lists = [];
    const List=[];
    setCall(call++)
    console.log("before list is " + lists);
    console.log("dataFromFirebase");
    firestore.collection("developer").onSnapshot(
      (snapshot) => {
        snapshot.forEach((doc) => {
          const {
            id,
            type,
            name,
            email,
            organization,
            developerType,
            end,
            experience,
            people,
            time,
            date,
            skill
          } = doc.data();
          lists.push({
            id:doc.id,
            type:type,
            name: name,
            email: email,
            organization: organization,
            developerType: developerType,
            end: end,
            experience: experience,
            people: people,
            time: time,
            date: date,
            skill:skill
          });
          console.log("kist is", lists.email);
        });
        setDevList(lists);
      },
      (err) => {
        console.log(err);
      }
    );
    firestore.collection("designer").onSnapshot(
      (snapshot) => {
        snapshot.forEach((doc) => {
          const {
            id,
            type,
            name,
            email,
            organization,
            designerType,
            experience,
            people,
            time,
            date,
            skill
          } = doc.data();
          List.push({
            id:doc.id,
            type:type,
            name: name,
            email: email,
            organization: organization,
            designerType: designerType,
            experience: experience,
            people: people,
            time: time,
            date: date,
            skill:skill
          });
          console.log("kist is", List);
        });
        setDesList(List);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const showData = () => {
    setShow(!show);
  };

  const OtherDetails = (props) => {
    console.log("date", props.skill);
    return (
      <Box key={props.key}>
        <Box className={clsx(classes.otherBox)}>
          <PersonIcon/>
        <h4> Experience : </h4>
            {props.experience}
        </Box>
        <Box className={clsx(classes.otherBox)}>
        <PeopleIcon /> {props.type=='developer'?<h4> Developers needed: </h4>:<h4> Designers needed: </h4>} {props.people}
        </Box>
        <Box className={clsx(classes.otherBox)}>
        <DateRangeIcon/>
            <h4>Start date:</h4>
           {props.date} 
        </Box>
        <Box className={clsx(classes.otherBox)}>
            <TimerIcon />  
            <h4>Duration:</h4>
           {props.time}
            </Box>
        <Box className={clsx(classes.otherBox)}>
            <h4>Skills:</h4>
          {props.skill.map((item,index)=>{
           return item.skill
          })}
          
            </Box>
      </Box>
    );
  };

const onClickToNextPage=(uid,item)=>{
  history.push({pathname:'/form/'+uid, state:item} )
  // history.push({ pathname: `${types}/${uid}` });
} 

  const RenderView = (props) => {
    
    return props.list?.map((item, index) => {
      var name = item.name;
      var initials = name.match(/\b\w/g) || [];
      initials = (
        (initials.shift() || "") + (initials.pop() || "")
      ).toUpperCase();
      return (
        <Grid item xs={3}>
          <Paper elevation={3}  key={item.id} className={clsx(classes.paper)}>
          <Bounce className={clsx(classes.paper)}>
            <div className={clsx(classes.box2)} onClick={()=>onClickToNextPage(item.id,item)}>
             {item.type=='developer'? <Avatar className={clsx(classes.avatarDev)} >
                {initials}
              </Avatar>: <Avatar className={clsx(classes.avatarDes)} >
                {initials}
              </Avatar>}
              <div>
                <h2>{item.name}</h2>
               {item.type=="developer"? <h4 style={{ color: "grey" }}>
                  {item.developerType}-{item.end}
                </h4>:<h4 style={{ color: "grey" }}>
                  {item.designerType}
                </h4> }
              </div>
            </div>
            <Box className={clsx(classes.box2)}>
              <Box className={clsx(classes.inbox)}>
                <EmailIcon color="disabled" />
                <h5>{item.email}</h5>
              </Box>
              <Box className={clsx(classes.outbox)}>
                <BusinessIcon color="disabled" />
                <h5>{item.organization}</h5>
              </Box>
            </Box>
            <Box>
              {show == true ? (
                <OtherDetails
                  key={index}
                  experience={item.experience.label}
                  time={item.time.label}
                  people={item.people}
                  date={item.date}
                  type={item.type}
                  skill={item.skill}
                />
              ) : null}
              {show == false ? (
                <ExpandMoreIcon  key={item.id} onClick={showData} />
              ) : (
                <ExpandLessIcon  key={item.id} onClick={showData} />
              )}
            </Box>
            </Bounce>
          </Paper>
        </Grid>
      );
    });
  };
  return (
    <Box>
      <Box bgcolor="primary.main" color="primary.contrastText" p={2}></Box>
      <Box
        className={clsx(classes.box1)}
        bgcolor="primary.main"
        color="primary.contrastText"
        p={3}
      ></Box>
      <Grid className={clsx(classes.grid)} container spacing={3}>
      <RenderView list={devList} key={devList.uid}/>
      <RenderView list={desList} key={desList.uid}/>
      </Grid>
      <Box marginTop={95} bgcolor="primary.main" p={2}></Box>
      <Box
        className={clsx(classes.box)}
        //flexDirection="row"
        bgcolor="primary.main"
        color="primary.contrastText"
        p={2}
      ></Box>
    </Box>
  );
}

export default withRouter(FormData)
// <Box className={clsx(classes.box2)}>
// <Avatar className={clsx(classes.avatar)}>
//   {/* {item.name.charAt(0)} */}
//   {initials}
// </Avatar>
//               <Box className={clsx(classes.paper)}>
// <h2 style={{ marginLeft: "5%" }}>{item.name}</h2>
//                 {/* <h5>{item.end}</h5> */}
//                 <h3 style={{ color: "grey" }}>
//                   {item.developerType}-{item.end}
//                 </h3>
//               </Box>
// {/* <h4 style={{ color: "grey" }}>
//     {item.developerType}-{item.end}
//   </h4> */}
//             </Box>
// <Box className={clsx(classes.box2)}>
//   <Box className={clsx(classes.inbox)}>
//     <EmailIcon color="disabled" />
//     <h5>{item.email}</h5>
//   </Box>
//    <Box className={clsx(classes.outbox)}>
//      <BusinessIcon color="disabled" />
//      <h5>{item.organization}</h5>
//    </Box>
// </Box>
// <Box>
//   {show == true ? (
//     <OtherDetails
//       experience={item.experience.label}
//       time={item.time.label}
//       people={item.people}
//       date={item.date}
//     />
//   ) : null}
//   {show == false ? (
//     <ExpandMoreIcon onClick={showData} />
//   ) : (
//     <ArrowUpwardIcon onClick={showData} />
//   )}
// </Box>
