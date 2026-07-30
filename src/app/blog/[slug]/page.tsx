import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { createPageMetadata } from "@/lib/metadata";
import { getAdjacentPosts, getAllPosts, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "日记未找到" };

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className="wy-content-page">
      <Link href="/blog" className="wy-back">
        ← 返回日记列表
      </Link>

      <div className="wy-box">
        <div className="wy-box-head">日记 · {post.title}</div>
        <div className="wy-box-body">
          <div className="wy-alt">
            发布时间：
            {format(new Date(post.date), "yyyy-MM-dd HH:mm:ss", {
              locale: zhCN,
            })}
            {" · "}
            阅读约 {post.readingTime} 分钟 · 作者：{siteConfig.author}
          </div>

          {post.tags.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              {post.tags.map((tag) => (
                <Link key={tag} href="/tags" className="wy-tag">
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div
            style={{
              marginTop: 16,
              borderTop: "1px dashed #c5daf0",
              paddingTop: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              {prev ? (
                <Link href={`/blog/${prev.slug}`}>« {prev.title}</Link>
              ) : (
                <span style={{ color: "#999" }}>已是最早</span>
              )}
            </div>
            <div>
              {next ? (
                <Link href={`/blog/${next.slug}`}>{next.title} »</Link>
              ) : (
                <span style={{ color: "#999" }}>已是最新</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}