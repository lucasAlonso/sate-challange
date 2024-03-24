"use client";
import { useDataStore } from "@/store/data-store";
import Link from "next/link";
import { format } from "date-fns";

export const Results = () => {
  const data = useDataStore((store) => store.data);
  return (
    <section className="w-1/3 bg-slate-100/70 h-[600px] rounded overflow-y-scroll flex flex-col">
      {data &&
        data.features.length > 0 &&
        data.features.map((feature) => (
          <Link
            className="w-full flex justify-between items-center p-1 text-sm"
            key={feature.id}
            href={`/landsat/${feature.id}`}
          >
            {feature.properties["aac:collection_display_name"]} -{" "}
            {format(feature.properties.datetime, "yyyy-MM-dd")}{" "}
          </Link>
        ))}
      {data?.features.length === 0 && <div>No results</div>}
    </section>
  );
};
