import MuiButton from "@mui/material/Button";
import { withStyles } from "@mui/styles";

const styles = {
  Button: {
    margin: "15px 0 0",    
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    width: "100%",
    fontSize: 14,    
  },
};

const Button = withStyles(styles)(MuiButton);

export default Button;
