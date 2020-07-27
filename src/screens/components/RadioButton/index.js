import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Radio, Button } from '@material-ui/core';
import { useStyles } from './styles';
import clsx from 'clsx';
export default function RadioButton(props) {
    const classes = useStyles();
    return (
        <FormControlLabel className={clsx(classes.radioText)}
        onChange={props.onChange}value={props.value} labelPlacement='end'  control={<Radio />} label={props.label}  />
    )
}
