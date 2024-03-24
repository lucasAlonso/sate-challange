import Image from "next/image";
import { SelectorForm } from "./selector-form";
import Map from "../ui/map";
import { Results } from "./results";

export const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen overflow-hidden">
      <div className="flex  items-center justify-center gap-4">
        <Image src="/umbrella.svg" alt="umbrela" width={48} height={48} />
        <h1>Umbrella Satellite Co</h1>
      </div>
      <SelectorForm />
      <section className="flex items-center justify-between gap-4 w-full mt-8 h-full">
        <Results />
        <Map />
      </section>
    </div>
  );
};
