import Link from "next/link";
import { confirmEmail } from "@/app/actions";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function ConfirmPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return <ConfirmLayout message="Invalid confirmation link." success={false} />;
  }

  const result = await confirmEmail(token);

  return (
    <ConfirmLayout
      message={result.success ? "You're confirmed. See you in the 404 phase." : result.error ?? "Something went wrong."}
      success={result.success}
    />
  );
}

function ConfirmLayout({ message, success }: { message: string; success: boolean }) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-2xl font-semibold text-white mb-2">
          {success ? "✓" : "✕"}
        </p>
        <p className="text-white/70 text-base">{message}</p>
        <Link href="/" className="mt-8 inline-block text-sm text-white/40 hover:text-white/70 transition-colors">
          ← Back to enter404.com
        </Link>
      </div>
    </main>
  );
}
