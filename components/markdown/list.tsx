import classcat from "classcat";
import { HTMLProps } from "react";

export function Ul({ children, className, ...props }: HTMLProps<HTMLUListElement>) {
  return (
    <ul className={classcat(["markdown-ul list-disc pl-5", className])} {...props}>
      {children}
    </ul>
  );
}
