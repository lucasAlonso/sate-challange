import { FormValues } from "@/types/forms/download-eod-form";
import { SearchResponse } from "@/types/search-response";
import { LatLngTuple } from "leaflet";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
  data: SearchResponse | null;
  formValues: FormValues | null;
  mainPolygon: LatLngTuple[] | null;
  updateData: (data: SearchResponse) => void;
  updateFormValues: (values: FormValues) => void;
  updateMainPolygon: (polygon: LatLngTuple[]) => void;
}

export const useDataStore = create<State>()(
  persist(
    (set) => ({
      data: null,
      formValues: null,
      mainPolygon: null,
      updateData: (data: SearchResponse) => set({ data: data }),
      updateFormValues: (values: FormValues) => set({ formValues: values }),
      updateMainPolygon: (polygon: LatLngTuple[]) =>
        set({ mainPolygon: polygon }),
    }),
    {
      name: "data-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
