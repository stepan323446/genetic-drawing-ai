import { cn } from "@/shadcn/lib/utils";
import type { JSX, ReactNode } from "react";

type TypographyVariant = 'h1'|'h2'|'h3'|'subtitle1'|'subtitle2'|'body1'|'body2'|'meta';

interface TypographyProps {
  children: ReactNode
  variant?: TypographyVariant,
  className?: string
}

const styles: Record<TypographyVariant, string> = {
  h1:        "scroll-m-20 text-4xl font-medium tracking-tight lg:text-5xl",
  h2:        "scroll-m-20 text-3xl font-semibold tracking-tight",
  h3:        "scroll-m-20 text-2xl font-semibold tracking-tight",
  subtitle1: "text-xl",
  subtitle2: "text-lg",
  body1:     "text-base leading-7",
  body2:     "text-sm leading-6",
  meta:      "text-xs text-muted-foreground",
}

const tags: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: 'h1', h2: 'h2', h3: 'h3',
  subtitle1: 'p', subtitle2: 'p',
  body1: 'p', body2: 'p', meta: 'span',
}

const Typography = ({ variant = 'body1', children, className }: TypographyProps) => {
  const Tag = tags[variant]
  
  return (
    <Tag className={cn(styles[variant], className)}>
      {children}
    </Tag>
  )
}

export default Typography;