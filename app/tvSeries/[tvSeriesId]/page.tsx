"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import useTvSeriesDetails from "@/app/hooks/useTvSeriesDetails";
import { LucideEdit, PlusIcon, Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSeason from "@/app/hooks/useSeason";
import Link from "next/link";

const TvSeriesDetails = () => {
  const { tvSeriesId } = useParams();
  const {
    tvSeriesDetails,
    isTvSeriesDetailsError,
    isTvSeriesDetailsLoading,
    isTvSeriesDetailsSuccess,
    getDetails,
  } = useTvSeriesDetails({ seriesId: tvSeriesId as string });

  const {
    addSeasonHandler,
    newSeason,
    isNewSeasonSuccess,
    isNewSeasonError,
    isNewSeasonLoading,
    newSeasonError,
    setSeasonInput,
  } = useSeason({
    tvSeriesId: tvSeriesId as string,
  });

  useEffect(() => {
    if (
      !isNewSeasonLoading &&
      !isNewSeasonError &&
      isNewSeasonSuccess &&
      newSeason
    ) {
      getDetails(tvSeriesId as string);
    }
  }, [newSeason, isNewSeasonSuccess, isNewSeasonError, isNewSeasonLoading]);

  return (
    <div className="w-full p-16">
      <div className="w-full mb-4">
        <h3 className="text-3xl font-bold w-full text-center mb-2">
          {!isTvSeriesDetailsLoading &&
            !isTvSeriesDetailsError &&
            isTvSeriesDetailsSuccess &&
            tvSeriesDetails &&
            tvSeriesDetails.payload.data.name}
        </h3>
        <p>
          {!isTvSeriesDetailsLoading &&
            !isTvSeriesDetailsError &&
            isTvSeriesDetailsSuccess &&
            tvSeriesDetails &&
            tvSeriesDetails.payload.data.description}
        </p>
      </div>
      <div className="w-full flex flex-row justify-between mb-2">
        <p></p>
        <h3 className="font-bold text-center">Seasons</h3>
        <Dialog>
          <DialogTrigger>
            <Button>
              <PlusIcon /> Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Season</DialogTitle>
              <DialogDescription>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2 mb-4"
                  placeholder="Season Name"
                  onChange={(e) =>
                    setSeasonInput((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
                <br />

                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2 mb-4"
                  placeholder="Folder Size"
                  onChange={(e) =>
                    setSeasonInput((prev) => ({
                      ...prev,
                      folderSize: e.target.value,
                    }))
                  }
                />
                <div>
                  <button
                    className="w-full hover:cursor-pointer rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-teal-500"
                    onClick={addSeasonHandler}
                    disabled={isNewSeasonLoading}
                  >
                    {isNewSeasonLoading && (
                      <span className="loading loading-spinner loading-sm"></span>
                    )}{" "}
                    Add
                  </button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table w-full text-center">
          {/* head */}
          <thead>
            <tr className="border-2">
              <th></th>
              <th className="border-2">Name</th>
              <th className="border-2">Folder Size</th>
              <th className="border-2">Total Episodes</th>
              <th className="border-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {!isTvSeriesDetailsLoading &&
              !isTvSeriesDetailsError &&
              isTvSeriesDetailsSuccess &&
              tvSeriesDetails &&
              tvSeriesDetails.payload.data.seasons.map(
                (dt: any, idx: number) => (
                  <tr key={dt._id ?? idx} className="border-2">
                    <th>{idx + 1}</th>
                    <td className="border-2">{dt.name}</td>
                    <td className="border-2">{dt.folderSize}</td>
                    <td className="border-2">
                      {dt.episodes ? dt.episodes.length : 0}
                    </td>
                    <td className="flex gap-2 justify-center">
                      <Link href={"/season/" + dt._id}>
                        <Button size={"sm"} variant={"link"}>
                          <LucideEdit />
                        </Button>
                      </Link>
                      <Button size={"sm"} variant={"destructive"}>
                        <Trash2Icon />
                      </Button>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TvSeriesDetails;
