import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Input = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "20px",
    position: "relative",
    backgroundColor: "#FFFFFF",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 12,
    width: "100%",
    height: 29,
    textAlign: "center",
  },
  "& .MuiInputBase-input::placeholder": {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: 0.43,
    color: "#64748b",
  },
}));

export default Input;
