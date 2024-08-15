interface Props {
  params: { id: string };
}

const CollectionPage = ({ params: { id } }: Props) => {
  return (
    <div>
      <h1>Collection {id}</h1>
    </div>
  );
};
