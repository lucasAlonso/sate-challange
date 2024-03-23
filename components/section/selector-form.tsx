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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, CheckIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Close } from "@radix-ui/react-popover";
import { fetchData } from "@/lib/fetch-data";

export function SelectorForm() {
  const form = useForm<z.infer<typeof formEodSchema>>({
    resolver: zodResolver(formEodSchema),
  });

  async function onSubmit(values: z.infer<typeof formEodSchema>) {
    console.log(values);
    const from = new Date(values.date.from).toISOString();
    const to = new Date(values.date.to).toISOString();

    const data = await fetchData({
      latmin: values.latmin,
      latmax: values.latmax,
      lonmin: values.lonmin,
      lonmax: values.lonmax,
      dateFrom: from,
      dateTo: to,
    });
    console.log(data);
  }

  return (
    <div className="space-y-8 p-8 max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="lonmin"
            defaultValue={0}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimun Longitude</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="lat min" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="latmin"
            defaultValue={0}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimun Latitude</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="lat min" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="latmax"
            defaultValue={0}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximun Latitude</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="lat max" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lonmax"
            defaultValue={0}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximun Longitude</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="lat min" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Frame</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from || "" ? (
                          field.value.to || "" ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 flex flex-col h-96"
                      align="center"
                    >
                      <div className="pb-6">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                        <Close className="absolute bottom-2 right-1/2 ">
                          <CheckIcon color="green" className="h-6 w-6" />
                        </Close>
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
