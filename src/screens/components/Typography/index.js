import React from 'react'
import Typography from 'material-ui/styles/typography'

function TextTypography(props) {
    return (
       <Typography>
          {props.text}
       </Typography>
    )
}

export default TextTypography;