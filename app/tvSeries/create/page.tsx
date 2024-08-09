"use client";
import React from "react";
import useTvSeries from "@/app/hooks/useTvSeries";
import { Textarea } from "@/components/ui/textarea";

const CreateTvSeries = () => {
  const {
    tvSeriesInput,
    setTvSeriesInput,
    isNewTVSeriesLoading,
    addSeriesHandler,
  } = useTvSeries({});

  return (
    <div className="w-full p-20">
      <div className="flex flex-col justify-center items-center gap-4">
        <h2>Add Tv Series</h2>
        <div className="border-2 shadow-lg flex flex-col gap-2 p-4">
          <input
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2"
            placeholder="Series Name"
            onChange={(e) =>
              setTvSeriesInput((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />

          <Textarea
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2"
            placeholder="Series Description"
            onChange={(e) =>
              setTvSeriesInput((prev) => ({
                ...prev,
                descrption: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <button
            className="hover:cursor-pointer rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-teal-500"
            onClick={addSeriesHandler}
            disabled={isNewTVSeriesLoading}
          >
            {isNewTVSeriesLoading && (
              <span className="loading loading-spinner loading-sm"></span>
            )} Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTvSeries;
