import { toast } from '@/components/ui/use-toast';
import { useGetSeasonDetailsMutation } from '@/store/apis/seasonsApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const useSeasonDetails = (props: {seasonId: string}) => {
    const {seasonId} = props;
    const router = useRouter();

    const [getSeasonDetails, {
        data: seasonDetails,
        isSuccess: isSeasonDetailsSuccess,
        isLoading: isSeasonDetailsLoading,
        isError: isSeasonDetailsError,
        error: seasonDetailsError,
    }] = useGetSeasonDetailsMutation();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true" ? true : false;

    useEffect(() => {
        if (!isLoggedIn) {
          router.push("/login");
        } else {
            getSeasonDetails(seasonId);
        }
      }, [isLoggedIn, seasonId]);

      useEffect(() => {
        if (
          !isSeasonDetailsError &&
          !isSeasonDetailsLoading &&
          isSeasonDetailsSuccess &&
          seasonDetails
        ) {
          toast({
            title: "Successfully Found TV Series list!",
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
        }
    
        if (isSeasonDetailsError && !isSeasonDetailsLoading && seasonDetailsError) {
          const err = seasonDetailsError as FetchBaseQueryError;
          if (err && err.status === 403) {
            localStorage.setItem('isLoggedIn', 'false');
            router.push("/login");
          }
        }
      }, [seasonDetails, isSeasonDetailsError, isSeasonDetailsLoading, isSeasonDetailsSuccess, seasonDetailsError]);

  return {
    getSeasonDetails,
    seasonDetails, isSeasonDetailsError, isSeasonDetailsLoading, isSeasonDetailsSuccess, seasonDetailsError,
  }
}

export default useSeasonDetails