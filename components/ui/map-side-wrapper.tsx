import { TileMapResponse } from "@/types/tileresponse";
import MapSide from "./map-side";

async function fetchTileData(url: string | undefined) {
  if (!url) {
    return;
  }
  const data = await fetch(url);
  const resData = (await data.json()) as unknown as TileMapResponse;

  return resData;
}

interface Props {
  url: string | undefined;
}

export const MapSideWrapper = async ({ url }: Props) => {
  const data = await fetchTileData(url);

  return <MapSide data={data} />;
};
