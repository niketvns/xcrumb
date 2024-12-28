"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sprintSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { Controller, useForm } from "react-hook-form";
import "react-day-picker/style.css";
import useFetch from "@/hooks/useFetch";
import { createSprint } from "@/actions/sprints";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SprintCreationForm = ({
  projectTitle,
  projectKey,
  projectId,
  sprintKey,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 14),
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(sprintSchema),
    mode: "onChange",
    defaultValues: {
      name: `${projectKey}-${sprintKey}`,
      startDate: dateRange.from,
      endRange: dateRange.to,
    },
  });
  const {
    data: sprint,
    loading: createSprintLoading,
    error: createSprintError,
    fn: createSprintFn,
  } = useFetch(createSprint);

  const onSubmit = async (sprintData) => {
    await createSprintFn(projectId, {
      ...sprintData,
      startDate: dateRange.from,
      endDate: dateRange.to,
    });
    setShowForm(false);
  };

  useEffect(() => {
    if (sprint) {
      toast.success("Sprint created successfully");
      router.refresh();
    } else if (createSprintError) {
      toast.error(createSprintError.message);
    }
  }, [createSprintError, sprint]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold mb-8 gradient-title">
          {projectTitle}
        </h1>
        <Button
          className="mt-2"
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "destructive" : "default"}
        >
          {showForm ? "Cancel" : "Create New Sprint"}
        </Button>
      </div>

      {showForm && (
        <Card className="pt-4 mb-4">
          <CardContent>
            <form
              className="flex gap-4 items-end"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex-1">
                <label htmlFor="name">Sprint Name</label>
                <Input
                  id="name"
                  readOnly
                  className="bg-slate-950"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Sprint Duration
                </label>
                <Controller
                  control={control}
                  name="dateRange"
                  render={({ field }) => {
                    return (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal bg-slate-950 ${
                              !dateRange && "text-muted-foreground"
                            }`}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {dateRange.from && dateRange.to
                              ? format(dateRange.from, "LLL dd y") +
                                " - " +
                                format(dateRange.to, "LLL dd, y")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto bg-slate-900"
                          align="start"
                        >
                          <DayPicker
                            classNames={{
                              chevron: "fill-blue-500",
                              range_start: "bg-blue-700",
                              range_end: "bg-blue-700",
                              range_middle: "bg-blue-400",
                              day_button: "border-none",
                              today: "border-2 border-blue-700",
                            }}
                            mode="range"
                            disabled={[{ before: new Date() }]}
                            selected={dateRange}
                            onSelect={(range) => {
                              if (range?.from && range?.to) {
                                setDateRange(range);
                                field.onChange(range);
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    );
                  }}
                />
              </div>
              <Button type="submit" disabled={createSprintLoading}>
                {createSprintLoading ? "Creating..." : "Create Sprint"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SprintCreationForm;
