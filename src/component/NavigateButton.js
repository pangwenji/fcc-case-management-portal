import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const NavigateButton = (props) => {
    const navigate = useNavigate();

    return (
        <Button onClick={() => {navigate("/cms/") }} variant="contained">
            Details
        </Button>
    )
}

export default NavigateButton;