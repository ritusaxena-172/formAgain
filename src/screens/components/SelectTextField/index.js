import React from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useStyles } from './styles';
import clsx from 'clsx';

function SelectTextField(props){
    const classes = useStyles();
    return(
      <TextField select label={props.label} value={props.value} onChange={props.onChange}
        helperText={props.helperText} variant="outlined" className={clsx(classes.textField)}
      >
        {props.array.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )
}

export default SelectTextField;