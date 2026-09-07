import Link from "next/link";
import { notFound } from "next/navigation";
import { topics, findTopic } from "@/lib/topics";
import TopicDetail from "@/components/TopicDetail.client";

// Required for static export: enumerates every slug up front so Next.js
// can pre-render each topic page as a static HTML shell at build time.
export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = findTopic(slug);
  if (!topic) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:px-10">
      <Link href="/learn" className="text-xs text-[#8b91a3] hover:text-[#e7e9ee]">
        ← Learn
      </Link>
      <TopicDetail topic={topic} />
    </div>
  );
}
