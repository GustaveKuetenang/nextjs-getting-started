import { Alert, AlertTitle } from "@/components/ui/alert";

export default function UnauthorisedPage() {
  return (
    <Alert>
      <AlertTitle>You need to be authenticated to acces this page.</AlertTitle>
    </Alert>
  );
}
