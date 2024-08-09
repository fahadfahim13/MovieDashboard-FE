import { toast } from "@/components/ui/use-toast";
import { useCreateEpisodeMutation, useCreateSeasonMutation } from "@/store/apis/seasonsApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const useEpisode = (props: { seasonId: string }) => {
  const { seasonId } = props;
  const router = useRouter();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true" ? true : false;

  const [episodeInput, setEpisodeInput] = useState({
    name: "",
    duration: "",
    fileSize: "",
    releaseDate: "",
  });

  const [
    createEpisode,
    {
      data: newEpisode,
      isSuccess: isNewEpisodeSuccess,
      isLoading: isNewEpisodeLoading,
      isError: isNewEpisodeError,
      error: newEpisodeError,
    },
  ] = useCreateEpisodeMutation();

  useEffect(() => {
    if (
      !isNewEpisodeLoading &&
      !isNewEpisodeError &&
      isNewEpisodeSuccess &&
      newEpisode
    ) {
      toast({
        title: "Successfully Added New Episode!",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    }
    if (!isNewEpisodeLoading && isNewEpisodeError && newEpisodeError) {
      toast({
        title: "Couldn't Add New Episode!",
        variant: "destructive",
      });
      const err = newEpisodeError as FetchBaseQueryError;
      if (err && err.status === 403) {
        localStorage.setItem("isLoggedIn", "false");
        router.push("/login");
      }
    }
  }, [
    newEpisode,
    isNewEpisodeSuccess,
    isNewEpisodeError,
    isNewEpisodeLoading,
    newEpisodeError,
  ]);

  const addEpisodeHandler = () => {
    createEpisode({
      name: episodeInput.name,
      duration: episodeInput.duration,
    fileSize: episodeInput.fileSize,
    releaseDate: episodeInput.releaseDate,
      seasonId,
    });
  };

  return {
    episodeInput,
    setEpisodeInput,
    addEpisodeHandler,
    newEpisode,
    isNewEpisodeSuccess,
    isNewEpisodeError,
    isNewEpisodeLoading,
    newEpisodeError,
  };
};

export default useEpisode;
