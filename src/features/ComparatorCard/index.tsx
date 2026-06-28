import { useActions, useGA, useSettings, type FitnessStoryItem } from "@/app/providers/AppContext";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { useState } from "react";
import CompareData from "./CompareData";
import NoDataCompare from "./NoDataCompare";
import GraphComparisonDialog from "./GraphComparisonDialog";

export interface CompareDataItem {
  size: number
  populationSize: number
  elitrate: number
  mutation: number
  maxIteration: number

  generation: number
  fitness: number
  aiPixels: Uint8Array
  chartNormalizedFi: FitnessStoryItem[]
}

const ComparatorCard = () => {
  const [ data1, setData1 ] = useState<CompareDataItem>();
  const [ data2, setData2 ] = useState<CompareDataItem>();

  const { size, populationSize, elitrate, mutation, maxIteration } = useSettings();
  const { generation, fitness, aiPixels, chartDataRef } = useGA();
  const { status } = useActions();

  const setCompareData = (type: 'data1'|'data2') => {
    const data: CompareDataItem = {
      size,
      populationSize,
      elitrate,
      mutation,
      maxIteration,
      generation,
      fitness,
      aiPixels: aiPixels.current.slice(),
      chartNormalizedFi: chartDataRef.current.slice()
    };

    if(type == 'data1')
      setData1(data);
    else
      setData2(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparator</CardTitle>
        <CardAction>
          <GraphComparisonDialog data1={data1} data2={data2} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
          <div className="pb-5 lg:pb-0 lg:pr-5">
            {data1 && <CompareData primaryData={data1} comparationData={data2} clearData={setData1} />}
            {!data1 && <NoDataCompare action={() => setCompareData('data1')} disabled={status == 'init'} />}
          </div>

          <div className="pt-5 lg:pt-0 lg:pl-5">
            {data2 && <CompareData primaryData={data2} comparationData={data1} clearData={setData2} />}
            {!data2 && <NoDataCompare action={() => setCompareData('data2')} disabled={status == 'init'} />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ComparatorCard;