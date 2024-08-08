import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TvSeries = (props: {
  name: string;
  image: string;
  description: string;
  id: string;
  seasons?: any[];
}) => {
  const { name, image, description, id } = props;
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex flex-row-reverse">
        <Link href={"/tvSeries/" + id}>
          <Button className="btn btn-accent">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TvSeries;
