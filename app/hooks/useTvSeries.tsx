import React, { useEffect, useState } from "react";
import {
  useCreateTvSeriesMutation,
  useGetTvSeriesListMutation,
} from "@/store/apis/tvSeriesApi";
import { toast } from "@/components/ui/use-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";

const useTvSeries = (props: { limit?: number; page?: number }) => {
  const { limit = 8, page = 1 } = props;
  const router = useRouter();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true" ? true : false;

  const [tvSeriesInput, setTvSeriesInput] = useState({
    name: "",
    descrption: "",
    image: "",
    accessType: "PUBLIC",
  });

  const [
    getSeriesList,
    {
      data: tvSeries,
      isSuccess: isTvSeriesSuccess,
      isError: isTvSeriesError,
      isLoading: isTvSeriesLoading,
      error: tvSeriesError,
    },
  ] = useGetTvSeriesListMutation();

  const [
    createSeries,
    {
      data: newTvSeries,
      isSuccess: isNewTvSeriesSuccess,
      isLoading: isNewTVSeriesLoading,
      isError: isNewTvSeriesError,
      error: newTvSeriesError,
    },
  ] = useCreateTvSeriesMutation();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      getSeriesList({
        limit,
        page,
      });
    }
  }, [isLoggedIn, limit, page]);

  useEffect(() => {
    if (
      !isTvSeriesError &&
      !isTvSeriesLoading &&
      isTvSeriesSuccess &&
      tvSeries
    ) {
      toast({
        title: "Successfully Found TV Series list!",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    }

    if (isTvSeriesError && !isTvSeriesLoading && tvSeriesError) {
      const err = tvSeriesError as FetchBaseQueryError;
      if (err && err.status === 403) {
        localStorage.setItem('isLoggedIn', 'false');
        router.push("/login");
      }
    }
  }, [tvSeries, isTvSeriesError, isTvSeriesLoading, isTvSeriesSuccess]);

  useEffect(() => {
    if (
      !isNewTVSeriesLoading &&
      !isNewTvSeriesError &&
      isNewTvSeriesSuccess &&
      newTvSeries
    ) {
      toast({
        title: "Successfully Added TV Series!",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });

      router.push("/dashboard");
    }

    if (isNewTvSeriesError && !isNewTVSeriesLoading && newTvSeriesError) {
      const err = newTvSeriesError as FetchBaseQueryError;
      if (err && err.status === 403) {
        localStorage.setItem('isLoggedIn', 'false');
        router.push("/login");
      } else {
        toast({
            title: 'Something wrong happened!',
            variant: 'destructive'
        })
      }
    }
  }, [
    newTvSeries,
    isNewTvSeriesSuccess,
    isNewTVSeriesLoading,
    isNewTvSeriesError,
    newTvSeriesError,
  ]);

  const addSeriesHandler = () => {
    createSeries({
      name: tvSeriesInput.name,
      description: tvSeriesInput.descrption,
      imae: tvSeriesInput.image,
      accessType: tvSeriesInput.accessType,
    });
  };

  return {
    tvSeries,
    isTvSeriesError,
    isTvSeriesLoading,
    isTvSeriesSuccess,
    tvSeriesInput,
    setTvSeriesInput,
    newTvSeries,
    isNewTvSeriesSuccess,
    isNewTVSeriesLoading,
    isNewTvSeriesError,
    newTvSeriesError,
    isLoggedIn,
    addSeriesHandler
  };
};

export default useTvSeries;
