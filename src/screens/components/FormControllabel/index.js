import React from 'react'
import { FormControlLabel } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { useStyles } from './styles';
import clsx from 'clsx';
function FormControllabel(props) {
    const classes = useStyles();
    return (
        <FormControlLabel className={clsx(classes.formText)} classes={{
            label:classes.formText
        }}
        control={<Switch checked={props.checked} onClick={props.onClick} />} label={props.label}/>  
    )
}

export default FormControllabel;

