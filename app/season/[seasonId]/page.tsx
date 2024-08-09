"use client";
import useSeasonDetails from '@/app/hooks/useSeasonDetails';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { LucideEdit, PlusIcon, Trash2Icon } from 'lucide-react';
import useEpisode from '@/app/hooks/useEpisode';

const SeasonDetails = () => {
    const { seasonId } = useParams();

    const {getSeasonDetails,
        seasonDetails, isSeasonDetailsError, isSeasonDetailsLoading, isSeasonDetailsSuccess, seasonDetailsError,} = useSeasonDetails({
        seasonId: seasonId as string
    });

    const {episodeInput,
        setEpisodeInput,
        addEpisodeHandler,
        newEpisode,
        isNewEpisodeSuccess,
        isNewEpisodeError,
        isNewEpisodeLoading,
        newEpisodeError,} = useEpisode({
        seasonId: seasonId as string
    });

    useEffect(() => {
        if (
          !isNewEpisodeLoading &&
          !isNewEpisodeError &&
          isNewEpisodeSuccess &&
          newEpisode
        ) {
            getSeasonDetails(seasonId as string);
        }
      }, [
        newEpisode,
        isNewEpisodeSuccess,
        isNewEpisodeError,
        isNewEpisodeLoading,
        newEpisodeError,
      ]);

  return (
    <div className="w-full p-16">
      <div className="w-full mb-4">
        <h3 className="text-3xl font-bold w-full text-center mb-2">
          {!isSeasonDetailsLoading &&
            !isSeasonDetailsError &&
            isSeasonDetailsSuccess &&
            seasonDetails &&
            seasonDetails.payload.data.name}
        </h3>
        {/* <p>
          {!isSeasonDetailsLoading &&
            !isSeasonDetailsError &&
            isSeasonDetailsSuccess &&
            seasonDetails &&
            seasonDetails.payload.data.folderSize}
        </p> */}
      </div>
      <div className="w-full flex flex-row justify-between mb-2">
        <p></p>
        <h3 className="font-bold text-center">Episodes</h3>
        <Dialog>
          <DialogTrigger>
            <Button>
              <PlusIcon /> Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Episode</DialogTitle>
              <DialogDescription>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2 mb-4"
                  placeholder="Episode Name"
                  onChange={(e) =>
                    setEpisodeInput((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
                <br />
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2 mb-4"
                  placeholder="Duration"
                  onChange={(e) =>
                    setEpisodeInput((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                />
                <br />
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2 mb-4"
                  placeholder="File Size"
                  onChange={(e) =>
                    setEpisodeInput((prev) => ({
                      ...prev,
                      fileSize: e.target.value,
                    }))
                  }
                />
                <br />

                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm border-2 mb-4"
                  placeholder="Release Date"
                  onChange={(e) =>
                    setEpisodeInput((prev) => ({
                      ...prev,
                      releaseDate: e.target.value,
                    }))
                  }
                />
                <div>
                  <button
                    className="w-full hover:cursor-pointer rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-teal-500"
                    onClick={addEpisodeHandler}
                    disabled={isNewEpisodeLoading}
                  >
                    {isNewEpisodeLoading && (
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
              <th className="border-2">Duration</th>
              <th className="border-2">File Size</th>
              <th className="border-2">Release Date</th>
              <th className="border-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isSeasonDetailsLoading &&
              !isSeasonDetailsError &&
              isSeasonDetailsSuccess &&
              seasonDetails &&
              seasonDetails.payload.data.episodes.map(
                (dt: any, idx: number) => (
                  <tr key={dt._id ?? idx} className="border-2">
                    <th>{idx + 1}</th>
                    <td className="border-2">{dt.name}</td>
                    <td className="border-2">{dt.duration}</td>
                    <td className="border-2">{dt.fileSize}</td>
                    <td className="border-2">{dt.releaseDate}</td>
                    <td className="flex gap-2 justify-center">
                    <Button size={"sm"} variant={"link"}>
                          <LucideEdit />
                        </Button>
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
  )
}

export default SeasonDetails