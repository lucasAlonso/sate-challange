import { LandsatDetail } from "@/components/section/landsat-detail";
import { MapSideWrapper } from "@/components/ui/map-side-wrapper";
import { fetchItemData } from "@/lib/fetch-data";

export default async function Page({
  params,
}: {
  params: { id_landsat: string };
}) {
  const data = await fetchItemData(params.id_landsat);

  return (
    <LandsatDetail data={data}>
      <MapSideWrapper
        url={
          data?.links.find(
            (link) => link.title === "TMS Map Layer without Ratio",
          )?.href
        }
      />
    </LandsatDetail>
  );
}
