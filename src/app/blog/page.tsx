import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { createPageMetadata } from "@/lib/metadata";
import { getAllPosts } from "@/lib/posts";
import { wangyou } from "@/lib/wangyou";

export const metadata = createPageMetadata({
  title: "日记",
  description: "我的日记列表",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="wy-content-page">
      <div className="wy-box">
        <div className="wy-box-head">{wangyou.modules.blog} · 全部日记</div>
        <div className="wy-box-body">
          <div className="wy-alt">
            我目前共有 <span>{posts.length}</span> 篇日志
          </div>

          {posts.length === 0 ? (
            <p style={{ color: "#888" }}>暂无日记</p>
          ) : (
            posts.map((post) => (
              <div className="wy-diary-item" key={post.slug}>
                <h3>
                  <span className="time">
                    {format(new Date(post.date), "yyyy-MM-dd HH:mm:ss", {
                      locale: zhCN,
                    })}
                  </span>
                  <br />
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <div className="content">{post.excerpt}</div>
                {post.tags.length > 0 && (
                  <div style={{ marginTop: 6 }}>
                    {post.tags.map((tag) => (
                      <Link key={tag} href="/tags" className="wy-tag">
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}

          <div className="wy-more">
            <Link href="/">&gt;&gt; 返回地盘首页</Link>
          </div>
        </div>
      </div>
    </div>
  );
}