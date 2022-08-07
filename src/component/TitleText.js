import { Typography } from "@mui/material";

const TitleText = ({ title = "" }) => {
    return (
        <Typography variant="h5" component="div">
            <div style={{padding:"20px 0px"}}>
                {title}
            </div>
            <div style={{width:"100%", height:"10px"}}></div>
        </Typography>
    )
}

export default TitleText;
