import { API_PATH } from "@/routes/api";
export type Props = {
  latmin: number;
  latmax: number;
  lonmin: number;
  lonmax: number;
  dateFrom: string;
  dateTo: string;
};
export async function fetchData({
  latmin,
  latmax,
  lonmin,
  lonmax,
  dateFrom,
  dateTo,
}: Props) {
  const url = API_PATH.catalog;
  const payload = {
    datetime: `${dateFrom}/${dateTo}`,
    collections: ["landsat8_c2l1t1"],
    limit: 50,
    bbox: [lonmin, latmin, latmax, lonmax],
  };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchItemData(id: string) {
  try {
    const url = API_PATH.serchItem + id;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
