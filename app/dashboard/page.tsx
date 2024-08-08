"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import useTvSeries from "../hooks/useTvSeries";
import TvSeries from "../components/TvSeries";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
  });

  const { tvSeries, isTvSeriesSuccess, isTvSeriesLoading, isTvSeriesError } =
    useTvSeries({ limit: pagination.limit, page: pagination.page });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);
  
  return (
    <div className="w-full p-20">
        <div className="w-full flex flex-row-reverse">
            <Link href={'/tvSeries/create'}><Button>Create New</Button></Link>
        </div>
      <div className="flex gap-4">
        {!isTvSeriesLoading &&
          !isTvSeriesError &&
          isTvSeriesSuccess &&
          tvSeries &&
          tvSeries.payload.data.map((dt: any) => (
            <TvSeries
              id={dt._id ?? ""}
              image={dt.image ?? ""}
              name={dt.name ?? ""}
              description={dt.description ?? ""}
              seasons={dt.seasons ?? []}
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
