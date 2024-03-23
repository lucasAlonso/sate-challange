import Image from "next/image";
import { SelectorForm } from "./selector-form";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import Map from "../ui/map";

export const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex  items-center justify-center gap-4">
        <Image src="/umbrella.svg" alt="umbrela" width={48} height={48} />
        <h1>Umbrela Satellite Co</h1>
      </div>
      <section className="flex items-center justify-center gap-4">
        <SelectorForm />
        <Map />
      </section>
    </div>
  );
};
