import React, { useEffect } from 'react';
import { useGetTvSeriesListMutation } from '@/store/apis/tvSeriesApi'

const useTvSeries = (props: {
    limit: number;
    page: number
}) => {
    const { limit=10, page=1 } = props;
    const [getSeriesList, {
        data: tvSeries,
        isSuccess: isTvSeriesSuccess,
        isError: isTvSeriesError,
        isLoading: isTvSeriesLoading
    }] = useGetTvSeriesListMutation();

    useEffect(() => {
        getSeriesList({
            limit, page
        });
    }, []);

  return {
    tvSeries,
    isTvSeriesError,
    isTvSeriesLoading,
    isTvSeriesSuccess
  }
}

export default useTvSeries