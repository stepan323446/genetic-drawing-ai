import { useActions, useGA, useSettings } from "@/app/providers/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import type { CompareDataItem } from "./CompareData";
import { useState } from "react";
import CompareData from "./CompareData";
import NoDataCompare from "./NoDataCompare";


const ComparatorCard = () => {
  const [ data1, setData1 ] = useState<CompareDataItem>();
  const [ data2, setData2 ] = useState<CompareDataItem>();

  const { size, populationSize, elitrate, mutation, maxIteration } = useSettings();
  const { generation, fitness, aiPixels } = useGA();
  const { status } = useActions();

  const setCompareData = (type: 'data1'|'data2') => {
    const data = {
      size,
      populationSize,
      elitrate,
      mutation,
      maxIteration,
      generation,
      fitness,
      aiPixels: aiPixels.current.slice()
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