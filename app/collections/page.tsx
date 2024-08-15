import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

const CollectionsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-bold text-xl">Your collections</h1>
        <Button className="flex items-center gap-2">
          <PlusCircleIcon />
          Add
        </Button>
      </div>
    </div>
  );
};

export default CollectionsPage;
