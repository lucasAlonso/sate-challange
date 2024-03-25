"use client";

import { formEodSchema } from "@/types/forms/download-eod-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetchData } from "@/lib/fetch-data";
import { useDataStore } from "@/store/data-store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { LatLngTuple } from "leaflet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function SelectorForm() {
  const form = useForm<z.infer<typeof formEodSchema>>({
    resolver: zodResolver(formEodSchema),
  });
  const updateFormValues = useDataStore((store) => store.updateFormValues);
  const updateData = useDataStore((store) => store.updateData);
  const storedFormValues = useDataStore((store) => store.formValues);
  const updateMainPolygon = useDataStore((store) => store.updateMainPolygon);

  async function onSubmit(values: z.infer<typeof formEodSchema>) {
    const from = new Date(values.from).toISOString();
    const to = new Date(values.to).toISOString();

    const data = await fetchData({
      latmin: values.latmin,
      latmax: values.latmax,
      lonmin: values.lonmin,
      lonmax: values.lonmax,
      dateFrom: from,
      dateTo: to,
      limit: values.limit,
    });
    const polygon: LatLngTuple[] = [
      [values.latmin, values.lonmin],
      [values.latmin, values.lonmax],
      [values.latmax, values.lonmax],
      [values.latmax, values.lonmin],
    ];

    updateMainPolygon(polygon);
    updateFormValues(values);
    updateData(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 justify-center items-center w-full h-16 flex-wrap"
      >
        <FormField
          control={form.control}
          name="lonmin"
          defaultValue={storedFormValues?.lonmin || undefined}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-32"
                  type="number"
                  placeholder="Min Long"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="latmin"
          defaultValue={storedFormValues?.latmin || undefined}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-32"
                  type="number"
                  placeholder="Min Lat"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="latmax"
          defaultValue={storedFormValues?.latmax || undefined}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  className="w-32"
                  placeholder="Max Lat"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lonmax"
          defaultValue={storedFormValues?.lonmax || undefined}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-32"
                  type="number"
                  placeholder="Max Long"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="from"
          defaultValue={storedFormValues?.from || undefined}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[120px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd-mm-yy")
                      ) : (
                        <span>Pick date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 flex flex-col h-96"
                  align="center"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="to"
          defaultValue={storedFormValues?.to || undefined}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[120px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd-mm-yy")
                      ) : (
                        <span>Pick date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    captionLayout="dropdown-buttons"
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="limit"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Response Limit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
}
