import { CssBaseline, Box } from "@mui/material";

const BaseContainer = ({children}) => {
    return (
        <Box sx={{ width: "100vw", height: "100vh", display: 'flex' }}>
            <CssBaseline />
            {children}
        </Box>
    )
}

export default BaseContainer;