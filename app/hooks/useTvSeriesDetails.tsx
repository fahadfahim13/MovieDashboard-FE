import { toast } from '@/components/ui/use-toast';
import { useGetTvSeriesDetailsMutation } from '@/store/apis/tvSeriesApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const useTvSeriesDetails = (props: {seriesId: string}) => {
    const {seriesId} = props;
    const router = useRouter();

    const [getDetails, {
        data: tvSeriesDetails,
        isSuccess: isTvSeriesDetailsSuccess,
        isLoading: isTvSeriesDetailsLoading,
        isError: isTvSeriesDetailsError,
        error: tvSeriesDetailsError,
    }] = useGetTvSeriesDetailsMutation();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true" ? true : false;

    useEffect(() => {
        if (!isLoggedIn) {
          router.push("/login");
        } else {
            getDetails(seriesId);
        }
      }, [isLoggedIn, seriesId]);

      useEffect(() => {
        if (
          !isTvSeriesDetailsError &&
          !isTvSeriesDetailsLoading &&
          isTvSeriesDetailsSuccess &&
          tvSeriesDetails
        ) {
          toast({
            title: "Successfully Found TV Series list!",
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
        }
    
        if (isTvSeriesDetailsError && !isTvSeriesDetailsLoading && tvSeriesDetailsError) {
          const err = tvSeriesDetailsError as FetchBaseQueryError;
          if (err && err.status === 403) {
            localStorage.setItem('isLoggedIn', 'false');
            router.push("/login");
          }
        }
      }, [tvSeriesDetails, isTvSeriesDetailsError, isTvSeriesDetailsLoading, isTvSeriesDetailsSuccess, tvSeriesDetailsError]);


  return {
    getDetails,
    tvSeriesDetails, isTvSeriesDetailsError, isTvSeriesDetailsLoading, isTvSeriesDetailsSuccess, tvSeriesDetailsError,
  }
}

export default useTvSeriesDetails