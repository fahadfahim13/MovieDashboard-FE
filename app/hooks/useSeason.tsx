import { toast } from "@/components/ui/use-toast";
import { useCreateSeasonMutation } from "@/store/apis/seasonsApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const useSeason = (props: { tvSeriesId: string }) => {
  const { tvSeriesId } = props;
  const router = useRouter();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true" ? true : false;

  const [seasonInput, setSeasonInput] = useState({
    name: "",
    folderSize: "",
  });

  const [
    createSeason,
    {
      data: newSeason,
      isSuccess: isNewSeasonSuccess,
      isLoading: isNewSeasonLoading,
      isError: isNewSeasonError,
      error: newSeasonError,
    },
  ] = useCreateSeasonMutation();

  useEffect(() => {
    if (
      !isNewSeasonLoading &&
      !isNewSeasonError &&
      isNewSeasonSuccess &&
      newSeason
    ) {
      toast({
        title: "Successfully Added New Season!",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    }
    if (!isNewSeasonLoading && isNewSeasonError && newSeasonError) {
      toast({
        title: "Couldn't Add New Season!",
        variant: "destructive",
      });
      const err = newSeasonError as FetchBaseQueryError;
      if (err && err.status === 403) {
        localStorage.setItem("isLoggedIn", "false");
        router.push("/login");
      }
    }
  }, [
    newSeason,
    isNewSeasonSuccess,
    isNewSeasonError,
    isNewSeasonLoading,
    newSeasonError,
  ]);

  const addSeasonHandler = () => {
    createSeason({
      name: seasonInput.name,
      folderSize: seasonInput.folderSize,
      tvSeriesId,
    });
  };

  return {
    seasonInput,
    setSeasonInput,
    addSeasonHandler,
    newSeason,
    isNewSeasonSuccess,
    isNewSeasonError,
    isNewSeasonLoading,
    newSeasonError,
  };
};

export default useSeason;
