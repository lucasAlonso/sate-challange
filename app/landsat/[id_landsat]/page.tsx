export default function Page({ params }: { params: { id_landsat: string } }) {
  return <div>My : {params.id_landsat}</div>;
}
