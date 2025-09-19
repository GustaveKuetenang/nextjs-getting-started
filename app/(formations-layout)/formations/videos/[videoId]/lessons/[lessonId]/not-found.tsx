import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>404</CardTitle>
        <CardDescription>Leçon introuvable</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href="/formations" className="">
          Retourner aux Formations
        </Link>
      </CardFooter>
    </Card>
  );
}
