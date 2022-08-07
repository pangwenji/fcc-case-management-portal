import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BasicCard({ userData }) {
  return (
    <div style={{ display: "flex" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Customer Id : {userData["customerId"] ?? ""}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Day Old : {userData["dayOld"] ?? ""}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Case Open Date : {userData["openDate"] ?? ""}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Priority : {userData["priority"] ?? ""}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Status : {userData["status"] ?? ""}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Follow up : {userData["followUp"] ?? ""}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
