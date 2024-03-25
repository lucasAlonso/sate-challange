import Image from "next/image";
import { SelectorForm } from "./selector-form";
import { Results } from "./results";
import dynamic from "next/dynamic";
import { SymbolIcon } from "@radix-ui/react-icons";
const Map = dynamic(() => import("../ui/map"), {
  loading: () => (
    <p className="w-full flex items-center justify-center">
      <SymbolIcon className="animate-spin" />
    </p>
  ),
  ssr: false,
});

export const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen overflow-hidden">
      <div className="flex  justify-between items-center p-2 w-full">
        <div className="flex  flex-col items-center justify-center p-4 mt-4">
          <Image src="/umbrella.svg" alt="umbrela" width={48} height={48} />
          <h1 className="whitespace-nowrap text-xs font-semibold text-sky-700/50">
            Umbrella Satellite Co
          </h1>
        </div>
        <SelectorForm />
      </div>
      <section className="flex justify-between gap-4 w-full h-full p-4">
        <Results />
        <Map />
      </section>
    </div>
  );
};
