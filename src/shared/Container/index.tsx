import { cn } from "@/shadcn/lib/utils";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode,
  className?: string
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-300 px-4 pt-8 pb-12 sm:px-6 lg:px-8", className)}>
      { children }
    </div>
  )
}

export default Container;