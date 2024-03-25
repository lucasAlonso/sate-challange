"use client";

import { useDataStore } from "@/store/data-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { MapSideWrapper } from "../ui/map-side-wrapper";
import { Feature } from "@/types/search-response";
import { PropsWithChildren } from "react";

interface Props {
  data: Feature;
}

export const LandsatDetail = ({ data, children }: PropsWithChildren<Props>) => {
  return (
    <section className="flex gap-3 h-screen overflow-hidden">
      <div className="flex flex-col w-1/3 h-screen overflow-y-scroll p-4">
        <h1>Assets</h1>
        {Object.entries(data?.assets || {}).map(([key, value]) => (
          <Accordion type="single" collapsible key={key}>
            <AccordionItem value={key}>
              <AccordionTrigger>{value.title}</AccordionTrigger>
              <AccordionContent className="whitespace-nowrap overflow-hidden">
                {" "}
                {value.href}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <div className="flex flex-col p-4">
        <h1>{data?.properties["aac:collection_display_name"]}</h1>
        {children}
        <div className="w-full">
          {data?.geometry?.coordinates.map((polygon, index) => (
            <div
              className="w-full flex flex-col justify-center items-center "
              key={index}
            >
              {polygon[0].map((point, idx) => (
                <div key={idx} className="flex gap-2">
                  <p>Latitude: {point[1]}</p>
                  <p>Longitude: {point[0]}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
