import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export const metadata = createPageMetadata({
  title: "标签",
  description: "日记标签",
  path: "/tags",
});

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="wy-content-page">
      <div className="wy-box">
        <div className="wy-box-head">日记标签</div>
        <div className="wy-box-body">
          {tags.length === 0 ? (
            <p style={{ color: "#888" }}>暂无标签</p>
          ) : (
            tags.map(({ tag, count }) => {
              const posts = getPostsByTag(tag);
              return (
                <div key={tag} style={{ marginBottom: 14 }}>
                  <div className="wy-alt">
                    <span className="wy-tag">{tag}</span> 共 {count} 篇
                  </div>
                  {posts.map((p) => (
                    <div key={p.slug} style={{ padding: "4px 0 4px 8px" }}>
                      <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                    </div>
                  ))}
                </div>
              );
            })
          )}
          <div className="wy-more">
            <Link href="/">&gt;&gt; 返回地盘首页</Link>
          </div>
        </div>
      </div>
    </div>
  );
}