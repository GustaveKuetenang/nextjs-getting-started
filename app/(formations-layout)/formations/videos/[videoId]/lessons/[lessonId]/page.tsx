import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VIDEOS } from "@app/(formations-layout)/formations/data";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ videoId: string; lessonId: string }>;
}

export async function generateStaticParams() {
  const videos = VIDEOS;

  const result = videos.flatMap((video) => {
    const params = video.lessons.map((lesson) => ({
      videoId: video.id,
      lessonId: lesson.id,
    }));
    return params;
  });

  return result;
}

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const params = await props.params;
  const videoId = params.videoId;
  const video = VIDEOS.find((v) => v.id === videoId);
  const lesson = video?.lessons.find((l) => l.id === params.lessonId);

  if (!video || !lesson) {
    notFound();
  }

  return {
    title: `Leçon • ${lesson.title}`,
    description: lesson.description,
  };
};

export const dynamic = "force-static";

export default async function Page(props: PageProps) {
  const params = await props.params;
  const videoId = params.videoId;
  const lessonId = params.lessonId;

  const video = VIDEOS.find((v) => v.id === videoId);

  if (!video) {
    notFound();
  }

  const lesson = video.lessons.find((l) => l.id === lessonId);
  if (!lesson) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lesson.title}</CardTitle>
        <CardDescription>{lesson.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={`/formations/videos/${videoId}`} className="">
          Retourner
        </Link>
      </CardFooter>
    </Card>
  );
}
