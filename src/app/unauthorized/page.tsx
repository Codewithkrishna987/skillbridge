import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Access Restricted
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          Your active user role does not possess permissions to view this domain workspace. 
          Please return to your designated portal or switch accounts.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/dashboard">
            <Button variant="primary">
              <ArrowLeft className="h-4 w-4" />
              Return to My Portal
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline">
              Switch Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
