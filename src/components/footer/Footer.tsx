import { FC } from "react";
import cn from "classnames";
import styles from "./Footer.module.scss";

interface IFooter {
  className?: string;
}

const Footer: FC<IFooter> = ({ className }: IFooter) => {
  const data = new Date().getFullYear();
  return (
    <footer className={cn(className, styles.footer)}>
      <div className={cn(styles.footerContainer)}>
        Copyright © {data} memorize | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
