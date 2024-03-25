"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Feature } from "@/types/search-response";
import { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { InfoCircledIcon, RulerSquareIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props {
  data: Feature;
}

export const LandsatDetail = ({ data, children }: PropsWithChildren<Props>) => {
  return (
    <section className="flex gap-3 h-screen overflow-hidden">
      <div className="flex flex-col w-1/3 h-screen overflow-y-scroll p-4">
        <h1 className="font-semibold text-xl text-sky-900/70 ">Assets</h1>
        {Object.entries(data?.assets || {}).map(([key, value]) => (
          <Accordion type="single" collapsible key={key}>
            <AccordionItem value={key}>
              <AccordionTrigger>{value.title}</AccordionTrigger>
              <AccordionContent className="whitespace-nowrap overflow-hidden">
                <p>{value.href}</p>
                <p>
                  {" "}
                  <span className="font-semibold">Type:</span> {value.type}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <div className="flex flex-col p-4">
        <div className="w-full p-4 flex justify-between">
          <h1 className="font-semibold text-lg text-slate-700">{data?.id}</h1>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="outline"
                        className="flex gap-1 items-center justify-center"
                      >
                        <RulerSquareIcon />{" "}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Geometry</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Geometry</DialogTitle>
                  <DialogDescription>
                    {data?.geometry?.coordinates.map((polygon, index) => (
                      <div
                        className="w-full flex flex-col justify-center items-center "
                        key={index}
                      >
                        {polygon[0].map((point, idx) => (
                          <div key={idx} className="flex gap-2">
                            <p>Lat: {point[1]}</p>
                            <p>Lon: {point[0]}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        className="flex gap-1 items-center justify-center"
                        variant="outline"
                      >
                        <InfoCircledIcon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>General Info</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>General Information</DialogTitle>
                  <DialogDescription>
                    <div className="border rounded p-4 bg-gray-100">
                      <h2 className="text-lg font-bold mb-2">Metadata</h2>
                      <div className="space-y-2">
                        <div>
                          <p className="font-semibold">
                            AAC Collection Attribution:
                          </p>
                          <p>{data.properties["aac:collection_attribution"]}</p>
                        </div>
                        <div>
                          <p className="font-semibold">
                            AAC Collection Display Name:
                          </p>
                          <p>
                            {data.properties["aac:collection_display_name"]}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">
                            AAC Collection Family Display Name:
                          </p>
                          <p>
                            {
                              data.properties[
                                "aac:collection_family_display_name"
                              ]
                            }
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">AAC Item Attribution:</p>
                          <p>{data.properties["aac:item_attribution"]}</p>
                        </div>
                        <div>
                          <p className="font-semibold">AAC Item Family:</p>
                          <p>{data.properties["aac:item_family"]}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Constellation:</p>
                          <p>{data.properties["constellation"]}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Created:</p>
                          <p>{data.properties["created"].toString()}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Datetime:</p>
                          <p>{data.properties["datetime"].toString()}</p>
                        </div>
                        <div>
                          <p className="font-semibold">EO Constellation:</p>
                          <p>{data.properties["eo:constellation"]}</p>
                        </div>
                        <div>
                          <p className="font-semibold">License:</p>
                          <p>{data.properties["license"]}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Providers:</p>
                          <p>{data.properties["providers"][0]["name"]}</p>
                          <p>{data.properties["providers"][0]["url"]}</p>
                        </div>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};
