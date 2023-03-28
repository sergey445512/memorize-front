import { FC, memo, ReactNode } from "react";
import cn from "classnames";
import styles from "./Container.module.scss";

interface IContainer {
  children: ReactNode;
  className?: string;
}

const Container: FC<IContainer> = ({ children, className }: IContainer) => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};
export default Container;
