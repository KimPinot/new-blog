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
  return (
    <AnimatePresence exitBeforeEnter>
      {!collapse ? (
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: "auto",
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
