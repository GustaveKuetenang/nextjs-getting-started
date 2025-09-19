import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VIDEOS } from "../../data";

interface PageProps {
  params: Promise<{ videoId: string }>;
}

export async function generateStaticParams() {
  const videos = VIDEOS;

  const result = videos.map((video) => ({ videoId: video.id }));

  return result;
}

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const params = await props.params;
  const videoId = params.videoId;
  const video = VIDEOS.find((v) => v.id === videoId);

  if (!video) {
    notFound();
  }

  return {
    title: `Vidéo • ${video.title}`,
    description: `Details de la vidéo • ${video.title}`,
  };
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const videoId = params.videoId;

  const video = VIDEOS.find((v) => v.id === videoId);

  if (!video) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{video.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside">
          {video?.lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link
                href={`/formations/videos/${videoId}/lessons/${lesson.id}`}
                className="link"
              >
                <strong>{lesson.title}</strong>
              </Link>
              : {lesson.description}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href="/formations" className="">
          Retourner
        </Link>
      </CardFooter>
    </Card>
  );
}
