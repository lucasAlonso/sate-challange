import { TileMapResponse } from "@/types/tileresponse";
import { SymbolIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";

async function fetchTileData(url: string | undefined) {
  if (!url) {
    return;
  }
  const data = await fetch(url);
  const resData = (await data.json()) as unknown as TileMapResponse;
  return resData;
}
const MapSide = dynamic(() => import("./map-side"), {
  loading: () => (
    <p className="w-full flex items-center justify-center">
      <SymbolIcon className="animate-spin" />
    </p>
  ),
  ssr: false,
});
interface Props {
  url: string | undefined;
}

export const MapSideWrapper = async ({ url }: Props) => {
  const data = await fetchTileData(url);

  return <MapSide data={data} />;
};
