import { PageLayout } from "@/components/page-layout";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  return (
    <PageLayout>
      <header className="border-b -mx-4 px-4 pb-2">
        <Link href="/formations" className="text-2xl font-bold">
          Formations
        </Link>
      </header>
      {props.children}
    </PageLayout>
  );
}
