import { useGA, type FitnessStoryItem } from "@/app/providers/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shadcn/components/ui/chart";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shadcn/components/ui/empty";
import decimateFitnessStory from "@/utils/decimate";
import { ChartLineIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";

const FitnessGraphCard = () => {
  const { chartDataRef } = useGA();
  const [chartData, setChartData] = useState<FitnessStoryItem[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(decimateFitnessStory([...chartDataRef.current]));
    }, 500);
    return () => clearInterval(interval);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  // chartDataRef is a ref, intentionally omitted

  const getLastFitness = useMemo(() => {
    if(chartData.length == 0)
      return 0;

    return chartData[chartData.length - 1].normalizedFi.toFixed(3);
  }, [chartData]);

  const chartConfig = {
    fitness: {
      label: "Fitness",
      color: "#000000"
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Normalized Fitness ({getLastFitness})</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 && <ChartContainer config={chartConfig} className="h-50 w-full">
          <AreaChart data={chartData} accessibilityLayer>
            <XAxis dataKey="generation" tickLine={false} axisLine={false} />
            <YAxis domain={[0, 1]} tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />

            <Area
              dataKey="normalizedFi"
              fillOpacity={0.2}
              isAnimationActive={false}
            />
          </AreaChart>
        </ChartContainer>}
        <Empty hidden={chartData.length > 0}>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ChartLineIcon />
            </EmptyMedia>
            <EmptyTitle>No data to display</EmptyTitle>
            <EmptyDescription>
              You haven't started algorithm
              Get starting to see fitness graph
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </CardContent>
    </Card>
  )
}

export default FitnessGraphCard;