import { Button } from "@/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { ChartLine, ChartLineIcon } from "lucide-react";
import type { CompareDataItem } from ".";
import { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shadcn/components/ui/chart";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shadcn/components/ui/empty";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import decimateFitnessStory from "@/utils/decimate";

interface GraphComparisonDialogProps {
  data1?: CompareDataItem;
  data2?: CompareDataItem;
}

const GraphComparisonDialog = ({
  data1,
  data2,
}: GraphComparisonDialogProps) => {
  const chartData = useMemo(() => {
    const data1Array = data1 ? data1.chartNormalizedFi : [];
    const data2Array = data2 ? data2.chartNormalizedFi : [];

    const decimated1 = decimateFitnessStory([...data1Array]);
    const decimated2 = decimateFitnessStory([...data2Array]);

    const length = Math.max(decimated1.length, decimated2.length);

    return Array.from({ length }, (_, i) => ({
      generation: decimated1[i]?.generation ?? decimated2[i]?.generation ?? i,
      image1: decimated1[i]?.normalizedFi,
      image2: decimated2[i]?.normalizedFi,
    }));
  }, [data1, data2]);

  const minPoint = useMemo(() => {
    const minData1 = data1 ? data1.chartNormalizedFi[0].normalizedFi : 0;
    const minData2 = data2 ? data2.chartNormalizedFi[0].normalizedFi : 0;

    if(minData1 < minData2)
      return minData1
    else
      return minData2
  }, [data1, data2]);

  const chartConfig: ChartConfig = {
    image1: { label: "1 Image", color: "#000000" },
    image2: { label: "2 Image", color: "#3b82f6" },
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">
          Fitness graph <ChartLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Comparison normalized fit</DialogTitle>
        </DialogHeader>
        {chartData.length > 0 && (
          <ChartContainer config={chartConfig} className="h-50 w-full">
            <AreaChart data={chartData} accessibilityLayer>
              <XAxis dataKey="generation" tickLine={false} axisLine={false} />
              <YAxis 
              domain={[minPoint, 1]} 
              tickLine={false} axisLine={false}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(value)
              } />
              <ChartTooltip content={<ChartTooltipContent />} />

              <Area
                dataKey="image1"
                name="1 Image"
                stroke="var(--chart-1)"
                fill="var(--chart-1)"
                fillOpacity={0.2}
                isAnimationActive={false}
              />
              <Area
                dataKey="image2"
                name="2 Image"
                stroke="var(--chart-2)"
                fill="var(--chart-2)"
                fillOpacity={0.2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        )}
        <Empty hidden={chartData.length > 0}>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ChartLineIcon />
            </EmptyMedia>
            <EmptyTitle>No data to compare</EmptyTitle>
            <EmptyDescription>
              You haven't saved story
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </DialogContent>
    </Dialog>
  );
};

export default GraphComparisonDialog;
