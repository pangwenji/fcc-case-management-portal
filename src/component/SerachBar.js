import React, { useRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar(props) {
  const inputRef = useRef();
  return (
    <div style={{ margin: "0px 0px 20px 0px" }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search By Customer ID"
          ref={inputRef}
        />
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            props.onClick({ searchTerm: inputRef.current.children[0].value });
          }}
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    </div>
  );
}

export default SearchBar;
