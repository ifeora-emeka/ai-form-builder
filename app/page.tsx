import Link from "next/link";

export default function Home() {
  return (
    <Link href={`/forms/test-form`} className="p-36">
      Go to Form Builder
    </Link>
  );
}
