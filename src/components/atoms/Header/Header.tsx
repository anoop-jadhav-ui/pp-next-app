import { Typography } from "@mui/material";
import styles from "./Header.module.css";
import Image from "next/image";

function Header() {
  return (
    <Typography variant="h3" component="h1" textAlign="center">
      <div className={styles.logo}>
        <Image src="/logo-colored.svg" alt="logo" width={300} height={120} />
      </div>
    </Typography>
  );
}

export default Header;
