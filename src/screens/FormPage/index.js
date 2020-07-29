import React,{useEffect} from "react";
import {useSpring, animated, interpolate} from 'react-spring'
import Box from "@material-ui/core/Box";
import { Button, Paper, FormGroup } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import DateFnsUtils from '@date-io/date-fns';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
// import DateFnsUtils from "@date-io/date-fns";
import clsx from "clsx";
import useStyles from "./styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SelectTextField from "../components/SelectTextField";
import TextFields from "../components/TextField";
import RadioButton from "../components/RadioButton";
import FormControllabel from "../components/FormControllabel";
import { firestore } from "../../config/Firebase/firebase";
import "firebase/firestore";
import { useHistory,useParams, useLocation } from "react-router-dom";

const experience = [
  { value: "1", label: "0-2 years" },
  { value: "2", label: "2-4 years" },
  { value: "3", label: "4-6 years" },
  { value: "4", label: ">6 years" },
];
const marks = [
  { value: "1" },
  { value: "20" },
  { value: "30" },
  { value: "40" },
];

const times = [
  { value: "1", label: "0-6 months" },
  { value: "2", label: "6-12 months" },
  { value: "3", label: "12-18 months" },
  { value: "4", label: ">18 months" },
];

const skills = [
  {value:'1', skill: "React" },
  {value:'2', skill: "Android Studio" },
  {value:'3', skill: "Adobe" },
  {value:'4', skill: "Flutter" },
  {value:'5', skill: "React-native" },
  {value:'6', skill: "Java" },
  {value:'7', skill: "Swift" },
];

function PersonalDetails(props) {
  const classes = useStyles();

  const handleYearsChange = (event) => {
    console.log("experience isssss", event.target.value);
    props.setYears(event.target.value);
  };

  return (
    <Paper elevation={3} className={clsx(classes.paper1)}>
      <Grid container direction={"column"} spacing={3}>
        <TextTypography text="Personal Details" />
        <Grid item>
          <TextFields
            label="Name"
            value={props.name}
            onChange={(event) => {
              props.setName(event.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <TextFields
            label="Email"
            value={props.email}
            onChange={(event) => {
              props.setEmail(event.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <TextFields
            label="Organization"
            value={props.organization}
            onChange={(event) => {
              props.setOrganization(event.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <SelectTextField
            label="Select"
            value={props.years}
            onChange={handleYearsChange}
            helperText="Please select your year of experience"
            array={experience}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

function TextTypography(props) {
  return <Typography variant="h5">{props.text}</Typography>;
}

function Options(props) {
  const classes = useStyles();
  console.log('gcgd',props.end)
  const handleEndChange = (event) => {
    console.log("9");
    console.log("clicked");
    props.setEnd(event.target.value);
  };
  if (props.webCheck) {
    return (
      <RadioGroup value={props.end} onChange={handleEndChange}>
        <RadioButton value="front end" label="Front End" />
        <RadioButton value="back end" label="Back End" />
        <RadioButton value="both" label="Both" />
      </RadioGroup>
    );
  } else if (props.mobileCheck) {
    return (
      <RadioGroup value={props.end} onChange={handleEndChange}>
        <RadioButton value="Android" label="Android" />
        <RadioButton value="ios" label="iOS" />
        <RadioButton value="both" label="Both" />
      </RadioGroup>
    );
  }
}

function TimeProject(props) {
  const classes = useStyles();
  const handleTimeChange = (event) => {
    console.log("4");
    event.preventDefault();
    props.setTime(event.target.value);
  };
  function handleInputChange(event,value) {
   props.setSkill(event.target.value);
   console.log('value is',props.sskill)
  }
  return (
    <Paper elevation={3} className={clsx(classes.paper3)}>
      <Grid container width={30} direction={"column"} spacing={3}>
        <TextTypography text="About the Project" />
        <Grid item>
          <SelectTextField
            label="Select"
            value={props.time}
            onChange={handleTimeChange}
            helperText="Select the duration of project"
            array={times}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            multiple
            options={skills}
            getOptionLabel={(option) => option.skill}
            onChange={(event, value) => {
              props.setSkill([...props.sskill,value])
              console.log('value is',props.sskill)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Skills Required"
                placeholder="Add"
              />
            )}
          />
        </Grid>
        <Grid item>
          {props.time != "" &&
          (props.end != "" ||
            props.mobile != "" ||
            props.webDesignCheck ||
            props.uiuxCheck) ? (
            <Button
              className={clsx(classes.button1)}
              variant="contained"
              color="primary"
              onClick={()=>StoreInFirebase(
                props.type,
                props.name,
                props.email,
                props.organization,
                props.end,
                props.webCheck,
                props.mobileCheck,
                props.uiuxCheck,
                props.webDesignCheck,
                props.years,
                props.value,
                props.time,
                props.selectedDate,
                props.history
              )}
            >
              Save Data
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
}

function DeveloperOptions(props) {
  const classes = useStyles();
  console.log('some',props.end)
  const handleWebChange = () => {
    console.log("5");
    if (props.mobileCheck) {
      props.setWebCheck(!props.webCheck);
      props.setMobileCheck(!props.mobileCheck);
    } else {
      props.setWebCheck(!props.webCheck);
    }
  };
  const handleMobileChange = () => {
    console.log("6");
    if (props.webCheck) {
      props.setMobileCheck(!props.mobileCheck);
      props.setWebCheck(!props.webCheck);
    } else {
      props.setMobileCheck(!props.mobileCheck);
    }
  };
  const handleEndChange = (event) => {
    console.log("9");
    console.log("clicked");
    props.setEnd(event.target.value);
  };
  return (
    <Paper elevation={3} className={clsx(classes.paper2)}>
      <Grid container width={30} direction={"column"} spacing={2}>
        <TextTypography text="Developer for" />
        <FormGroup value={props.webCheck==true?props.check:props.mobileCheck}>
        <Grid item>
          {/* <FormGroup value={props.fend}> */}
          <FormControllabel
          value='Web Developer'
            checked={props.webCheck}
            onClick={handleWebChange}
            label="Web Development"
          />
          {props.webCheck && !props.mobileCheck ? (
            
              <RadioGroup value={props.end} onChange={handleEndChange}>
                <RadioButton value="front end" label="Front End" />
                <RadioButton value="back end" label="Back End" />
                <RadioButton value="both" label="Both" />
              </RadioGroup>
            
            // <Options
            //   end={props.end}
            //   setEnd={props.setEnd}
            //   setMobile={props.setMobile}
            //   webCheck={props.webCheck}
            //   mobileCheck={props.mobileCheck}
            // />
          ) : null}
          <FormControllabel
          value='Mobile Developer'
            checked={props.mobileCheck}
            onClick={handleMobileChange}
            label="Mobile Development"
          />
          {!props.webCheck && props.mobileCheck ? (
            <RadioGroup value={props.end} onChange={handleEndChange}>
            <RadioButton value="Android" label="Android" />
            <RadioButton value="ios" label="iOS" />
            <RadioButton value="both" label="Both" />
          </RadioGroup>
            // <Options
            //   setEnd={props.setEnd}
            //   setMobile={props.setMobile}
            //   webCheck={props.webCheck}
            //   mobileCheck={props.mobileCheck}
            // />
          ) : null}
          <br />    
          <Common
            value={props.value}
            setValue={props.setValue}
            selectedDate={props.selectedDate}
            setSelectedDate={props.setSelectedDate}
          />
        </Grid>
        </FormGroup> 
      </Grid>
    </Paper>
  );
}

function Common(props) {
  const classes = useStyles();
  const handleDateChange = (date) => {
    console.log("11");
   
    props.setSelectedDate(date);
    console.log("date is", date);
  };
  const valuetext = (value) => {
    console.log("1");
    props.setValue(value);
  };
  return (
    <Box>
      <Typography variant="h6">
        {props.type == "developer" ? "Developers needed" : "Designers needed"}
      </Typography>
      <Slider
      value={props.value}
        max={50}
        defaultValue={20}
        color="secondary"
        getAriaValueText={valuetext}
        step={2}
        valueLabelDisplay="auto"
        marks={marks}
        className={clsx(classes.wide)}
      />
      <MuiPickersUtilsProvider  utils={DateFnsUtils}>
        <KeyboardDatePicker
        className={clsx(classes.wide)}
          margin="normal"
          id="date-picker-dialog"
          label="Start date of the project"
          format="MM/dd/yyyy"
          value={props.selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
}
function DesignerOptions(props) {
  const classes = useStyles();
  const handleWebDesignChange = () => {
    console.log("7");
    if (props.uiuxCheck) {
      props.setWebDesignCheck(!props.webDesignCheck);
      props.setuiuxCheck(!props.uiuxCheck);
    } else {
      props.setWebDesignCheck(!props.webDesignCheck);
    }
  };
  const handleUIUXChange = () => {
    console.log("8");
    if (props.webDesignCheck) {
      props.setWebDesignCheck(!props.webDesignCheck);
      props.setuiuxCheck(!props.uiuxCheck);
    } else {
      props.setuiuxCheck(!props.uiuxCheck);
    }
  };

  return (
    <Paper className={clsx(classes.paper2)}>
      <Grid container width={30} direction={"column"} spacing={3}>
        <TextTypography text="Designer for" />
        <Grid item>
          <FormControllabel
            checked={props.webDesignCheck}
            onClick={handleWebDesignChange}
            label="Web Designing"
          />
        </Grid>
        <Grid item>
          <FormControllabel
            checked={props.uiuxCheck}
            onClick={handleUIUXChange}
            label="UI/UX Designing"
          />
        </Grid>
        <Grid item>
          <Common
          value={props.value}
            setValue={props.setValue}
            selectedDate={props.selectedDate}
            setSelectedDate={props.setSelectedDate}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
function StoreInFirebase(
  type,
  name,
  email,
  organization,
  end,
  webCheck,
  mobileCheck,
  uiuxCheck,
  webDesignCheck,
  years,
  value,
  time,
  date,
  history
) {
  var finaldate = date.getDate() + '-' +  (date.getMonth() + 1)  + '-' +  date.getFullYear()
  if (type == "developer") {
    firestore
      .collection("developer")
      .add({
        type:'developer',
        name: name,
        email: email,
        organization: organization,
        developerType:
          webCheck != false
            ? "Web Development"
            : mobileCheck != false
            ? "Mobile Development"
            : null,
        end: end,
        experience: experience[years-1],
        people: value,
        time: times[time-1],
        date: finaldate,
      })
      .then((data) => {
        console.log("id is", data.id);
        history.push("/formData");
      });
  } else if (type == "designer") {
    firestore
      .collection("designer")
      .add({
        type:'designer',
        name: name,
        email: email,
        organization: organization,
        designerType:
          uiuxCheck != false
            ? "UI/UX Designer"
            : webDesignCheck != false
            ? "Web Designer"
            : null,
        experience: experience[years-1],
        people: value,
        time: times[time-1],
        date: finaldate,
      })
      .then((data) => {
        console.log("id is", data.id);
        history.push("/formData");
      });
  }
}

function FormPage() {
  let history = useHistory();
  const props = useSpring({
    // opacity: 1,
    // from: { opacity: 0 },
    x: 100, from: { x: 0 } 
  })

  const location = useLocation();
  const uid=useParams()
   console.log('ff',uid)
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [type, setType] = React.useState('');
  const [end, setEnd] = React.useState("");
  const [time, setTime] = React.useState("");
  const [value, setValue] = React.useState("");
  const [years, setYears] = React.useState("");
  const [webCheck, setWebCheck] = React.useState(false);
  const [uiuxCheck, setuiuxCheck] = React.useState(false);
  const [mobileCheck, setMobileCheck] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-08-18T21:11:54")
  );
 
  const [sskill,setSkill]=React.useState([])
  const [webDesignCheck, setWebDesignCheck] = React.useState(false);
  const handleChange = (event) => {
    console.log("2");
    setType(event.target.value);
    setTime("");
  };

  const {o, xyz, color} = useSpring({
    from: {o: 0, xyz: [0, 0, 0], color: 'red'},
    o: 1,
    xyz: [10, 20, 5],
    color: 'green'
  })
  
  useEffect(() => {
    const data=location.state;
    if(data!=null)
   { 
    setName(data['name'])
    setEmail(data['email'])
    setOrganization(data['organization'])
    setType(data['type'])
    setEnd(data['end'])
    setSelectedDate(data['date'])
    setYears(data['experience'].value)
    setTime(data['time'].value)
    data['developerType']=='Web Developer'?setWebCheck(data['developerType']):setMobileCheck(data['developerType'])
    setValue(data['people'])
    console.log('from',data['type'])}

  },[]);
  return (
    <Box>
      <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
        <h1>Let us get to know you better!</h1>
        <TextTypography text="Are you looking for?" />
        <RadioGroup value={type} onChange={handleChange} row>
          <RadioButton value='developer' label="Developer" />
          <RadioButton value='designer' label="Designer" />
        </RadioGroup>
      </Box>
      <Box margin={4} display="flex" flexDirection="row">
        {type != ""? (
          <PersonalDetails
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            organization={organization}
            setOrganization={setOrganization}
            years={years}
            setYears={setYears}
          />
        ) : null}
        {type != ""  ? (
          type == "developer" ? (
            <DeveloperOptions
              setValue={setValue}
              end={end}
              value={value}
              mobileCheck={mobileCheck}
              setMobileCheck={setMobileCheck}
              webCheck={webCheck}
              setWebCheck={setWebCheck}
              setEnd={setEnd}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          ) : (
            <DesignerOptions
              setValue={setValue}
              value={value}
              webDesignCheck={webDesignCheck}
              setWebDesignCheck={setWebDesignCheck}
              uiuxCheck={uiuxCheck}
              setuiuxCheck={setuiuxCheck}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          )
        ) : null}
        {type != "" && (end != "" || webDesignCheck || uiuxCheck) ? (
          <TimeProject
            type={type}
            value={value}
            name={name}
            email={email}
            organization={organization}
            years={years}
            time={time}
            selectedDate={selectedDate}
            setTime={setTime}
            end={end}
            webCheck={webCheck}
            mobileCheck={mobileCheck}
            end={end}
            webDesignCheck={webDesignCheck}
            uiuxCheck={uiuxCheck}
            history={history}
            sskill={sskill}
            setSkill={setSkill}
          />
        ) : null}
      </Box>
    </Box>
  );
}

export default FormPage;
