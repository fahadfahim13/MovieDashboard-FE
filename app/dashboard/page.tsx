"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useTvSeries from "../hooks/useTvSeries";
import TvSeries from "../components/TvSeries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Dashboard = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    limit: 8,
    page: 1,
  });

  const { tvSeries, isTvSeriesSuccess, isTvSeriesLoading, isTvSeriesError } =
    useTvSeries({ limit: pagination.limit, page: pagination.page });

  return (
    <div className="w-full p-16">
      <div className="w-full flex flex-row-reverse mb-2 justify-between">
        <Link href={"/tvSeries/create"}>
          <Button className="btn bg-emerald-600 hover:bg-emerald-900">
            <PlusIcon /> Create New
          </Button>
        </Link>

        {pagination.page > 1 && (
          <Button
            className="btn bg-transparent text-blue-600 font-bold"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                page: prev.page - 1,
              }))
            }
            disabled={pagination.page === 1}
          >
            {" "}
            <ArrowLeftIcon /> Back
          </Button>
        )}
      </div>
      <div className="w-full flex flex-wrap gap-4">
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

      <div className="w-full flex">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                className="btn bg-transparent text-black hover:bg-transparent"
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    page: prev.page - 1,
                  }))
                }
              >
                <PaginationPrevious />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                className="btn bg-transparent text-black hover:bg-transparent"
                onClick={() =>
                {
                  setPagination((prev) => ({
                    ...prev,
                    page: prev.page + 1,
                  }))
                }
                }
              >
                <PaginationNext />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Dashboard;
