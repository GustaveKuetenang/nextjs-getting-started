import { PageLayout } from "@/components/page-layout";
import { ThemeSelector } from "@/components/theme-selector";
import Link from "next/link";

export default function Home() {
  return (
    <PageLayout>
      <h1>getting started with Next.js</h1>
      <Link href="/formations" className="text-indigo-500 underline">
        Plan de formation
      </Link>
      <ThemeSelector />
    </PageLayout>
  );
}
