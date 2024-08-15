import { AddCollectionModal } from "./_components/add-collection-modal";

const CollectionsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-bold text-xl">Your collections</h1>
        <AddCollectionModal />
      </div>
    </div>
  );
};

export default CollectionsPage;
