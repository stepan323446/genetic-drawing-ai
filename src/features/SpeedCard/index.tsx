import { useGA } from "@/app/providers/AppContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { Field, FieldLabel } from "@/shadcn/components/ui/field";
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";

const windows = [1, 10, 50, 100, 1000];

const SpeedCard = () => {
  const [speed, setSpeed] = useState(0);
  const lastLengthRef = useRef(0);
  const [ windowSize, setWindowSize ] = useState(100);
  const { fitness, chartDataRef } = useGA();

  useEffect(() => {
    const chartData = chartDataRef.current;
    const chartLength = chartData.length;
    
    if (chartLength >= windowSize && chartLength - lastLengthRef.current >= windowSize) {
      const diff = (fitness - chartData[chartLength - windowSize].fitness) / windowSize;
      setSpeed(diff);
      lastLengthRef.current = chartLength;
    } 
    else if (chartLength == 0) {
      setSpeed(0);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitness, windowSize]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Speed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl">
          {speed.toFixed(2)} fit/gen
        </div>
      </CardContent>
      <CardFooter>
        <Field>
          <FieldLabel>Window size</FieldLabel>
          <Select
            onValueChange={(val) => setWindowSize(Number(val))}
            value={String(windowSize)}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Canvas size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {windows.map((win) => (
                  <SelectItem key={win} value={String(win)}>
                    {win} generations
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default SpeedCard;