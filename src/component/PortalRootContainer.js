import { Box, Toolbar } from "@mui/material"
const PortalRootContainer = ({ children }) => {
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, flex: 1 }}
        >
            <Toolbar />
            <Box
                component="div"
                sx={{ flexGrow: 1, flex: 1, padding:"10px 20px", marginLeft:"auto", marginRight:"auto" }}
            >
                <div style={{maxWidth:"1500px", marginLeft:"auto", marginRight:"auto"}}>
                    {children}
                </div>
            </Box>

        </Box>
    )
}

export default PortalRootContainer;