import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export default function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium",
        "bg-primary text-white hover:opacity-90 transition",
        className
      )} />);


}