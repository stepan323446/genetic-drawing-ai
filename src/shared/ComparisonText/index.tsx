import { TrendingDown, TrendingUp } from "lucide-react"
import Typography from "../Typography"
import { cn } from "@/shadcn/lib/utils"
import { useMemo } from "react"

interface ComparisonTextProps {
  primaryValue: number
  comparisonValue: number
  className?: string
  inverse?: boolean
}

const ComparisonText = ({ primaryValue, comparisonValue, className, inverse = false }: ComparisonTextProps) => {
  const percentageDiff = useMemo(() => {
    if (comparisonValue === 0) {
      return primaryValue === 0 ? 0 : 9999;
    }
    return ((primaryValue - comparisonValue) / comparisonValue) * 100;
  }, [primaryValue, comparisonValue]);

  const isImprovement = useMemo(() => {
    if (percentageDiff === 0) return null;
    return inverse ? percentageDiff < 0 : percentageDiff > 0;
  }, [percentageDiff, inverse]);

  const textColorClass = useMemo(() => {
    if (isImprovement === null) return '';
    return isImprovement ? 'text-green-500' : 'text-red-500';
  }, [isImprovement]);

  return (
    <Typography className={cn("flex items-center", textColorClass, className)} variant="meta">
      {percentageDiff > 0 && <TrendingUp className="mr-1" />}
      {percentageDiff < 0 && <TrendingDown className="mr-1" />}
      {percentageDiff > 0 ? "+" : ""}{percentageDiff.toFixed(2)}%
    </Typography>
  )
}

export default ComparisonText;