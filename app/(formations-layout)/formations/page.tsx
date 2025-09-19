import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import { VIDEOS } from "./data";

export const metadata: Metadata = {
  title: "Plan de formation",
  description: "Liste des vidéos de formation",
};

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan de formation</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {VIDEOS.map((video) => (
          <Link
            key={video.id}
            href={`/formations/videos/${video.id}`}
            className="text-indigo-500 underline"
          >
            {video.title}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
