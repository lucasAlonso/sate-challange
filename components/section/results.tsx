"use client";
import { useDataStore } from "@/store/data-store";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "react-day-picker";

export const Results = () => {
  const data = useDataStore((store) => store.data);
  return (
    <section className="w-1/3 bg-slate-100/70 h-[600px] lg:h-[700px] rounded overflow-y-scroll flex flex-col p-4 gap-0.5">
      {data &&
        data.features.length > 0 &&
        data.features.map((feature) => (
          <Link
            className="w-full flex justify-between items-center p-1 text-sm border rounded border-slate-200 hover:bg-slate-200"
            key={feature.id}
            href={`/landsat/${feature.id}`}
          >
            <p className="truncate">{feature.id}</p>
            <p className="whitespace-nowrap">
              {format(feature.properties.datetime, "yyyy-MM-dd")}
            </p>{" "}
          </Link>
        ))}
      {data?.features.length === 0 && <div>No results</div>}
    </section>
  );
};
