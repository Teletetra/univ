import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="lab-label">404 · signal lost</p>
      <h1 className="mt-3 font-serif text-3xl text-[#e8ddf8]">
        This part of the universe hasn&apos;t been mapped yet.
      </h1>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-[#7469d8] px-5 py-3 text-sm text-white hover:bg-[#8579e8]"
      >
        ← Return to the universe
      </Link>
    </main>
  );
}