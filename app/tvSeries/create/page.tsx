"use client";
import { useCreateTvSeriesMutation } from "@/store/apis/tvSeriesApi";
import React, { useState } from "react";

const CreateTvSeries = () => {
  const [tvSeries, setTvSeries] = useState({
    name: "",
    descrption: "",
    image: "",
    accessType: "PUBLIC",
  });

  const [createSeries, { data, isSuccess, isLoading, isError }] =
    useCreateTvSeriesMutation();

  const addSeriesHandler = () => {
    createSeries({
      name: tvSeries.name,
      description: tvSeries.descrption,
      imae: tvSeries.image,
      accessType: tvSeries.accessType,
    });
  };

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
              setTvSeries((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />

          <input
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2"
            placeholder="Series Description"
            onChange={(e) =>
              setTvSeries((prev) => ({
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
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <p>Add</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTvSeries;
