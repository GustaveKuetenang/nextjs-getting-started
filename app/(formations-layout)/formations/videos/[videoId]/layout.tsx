import Link from "next/link";
import { PropsWithChildren } from "react";

export default async function Layout(
  props: PropsWithChildren<{
    params: Promise<{ videoId: string }>;
  }>
) {
  const params = await props.params;
  const videoId = params.videoId;

  return (
    <>
      <header className="border-b -mx-4 px-4 pb-2">
        <Link href={`/formations/${videoId}`} className="text-2xl font-bold">
          Formations/{videoId}
        </Link>
      </header>
      {props.children}
    </>
  );
}
