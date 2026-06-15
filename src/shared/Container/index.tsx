import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="mx-auto max-w-300 px-4 pt-8 sm:px-6 lg:px-8">
      { children }
    </div>
  )
}

export default Container;