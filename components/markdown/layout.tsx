import { HTMLProps } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cc from "classcat";

type Props = HTMLProps<HTMLDivElement>;

export function Section({ children, className, ...props }: Props) {
  return (
    <section className={cc(["flex flex-col", className])} {...props}>
      {children}
    </section>
  );
}

type CollapseProps = Props & {
  collapse: boolean;
};

export function Collapse({ children, collapse }: CollapseProps) {
  const height = {
    hidden: {
      marginTop: -8,
      height: 0,
      opacity: 0,
    },
    show: {
      marginTop: 0,
      height: "auto",
      opacity: 1,
    },
  };
  return (
    <motion.div initial={false} animate={collapse ? "show" : "hidden"} variants={height}>
      {children}
    </motion.div>
  );
}
