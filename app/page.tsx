import { ReactNode } from "react";
import Header from "./components/Header";

export default function Home(props: {
  children: ReactNode;
}) {
  const { children } = props;
  return (
    <main className="min-h-screen min-w-full">
      {children}
    </main>
  );
}
