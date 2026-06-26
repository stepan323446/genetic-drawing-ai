import { Button } from "@/shadcn/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shadcn/components/ui/empty";
import { FileText } from "lucide-react";

interface NoDataCompareProps {
  disabled?: boolean;
  action?: () => void;
}

const NoDataCompare = ({ disabled, action }: NoDataCompareProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileText />
        </EmptyMedia>
        <EmptyTitle>No data found</EmptyTitle>
        <EmptyDescription>
          Add current data to compare sessions. Start algorithm!
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => action?.()} disabled={disabled}>
          Add current data
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export default NoDataCompare;