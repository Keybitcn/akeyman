import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { aboutContent } from "@/lib/about";
import { siteConfig } from "@/lib/site";
import { wangyou } from "@/lib/wangyou";

export const metadata = createPageMetadata({
  title: "详细资料",
  description: `关于 ${siteConfig.author}`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="wy-content-page">
      <div className="wy-box">
        <div className="wy-box-head">{wangyou.profileTitle} · 详细资料</div>
        <div className="wy-box-body">
          <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="wy-avatar"
              src={wangyou.avatarLocal || wangyou.avatar}
              alt={wangyou.nickname}
              style={{ width: 120, height: 160 }}
            />
            <ul className="wy-base" style={{ flex: 1 }}>
              <li>
                主人：{wangyou.nickname}{" "}
                {wangyou.vip ? <em className="wy-vip">VIP用户</em> : null}
              </li>
              <li>身份：{aboutContent.role}</li>
              <li>性别：{wangyou.gender}</li>
              <li>年龄：{wangyou.age}（2007 年资料）</li>
              <li>星座：{wangyou.zodiac}</li>
              <li>所在地：{wangyou.location}</li>
              <li>用户名：{wangyou.username}</li>
              <li>原域名：{wangyou.domain}</li>
            </ul>
          </div>

          <div className="wy-alt">粉丝宣言</div>
          <p style={{ margin: "8px 0", color: "#c00", fontWeight: "bold" }}>
            {wangyou.slogan}
          </p>

          <div className="wy-alt">简介</div>
          <p style={{ margin: "8px 0", lineHeight: 1.8 }}>{aboutContent.bio}</p>

          <div className="wy-stats">
            <div>
              鸿热度：<b>{wangyou.hotLevel}</b>
            </div>
            <div>
              好友：<b>{wangyou.friends}</b> 人
            </div>
            <div>
              粉丝：<b>{wangyou.fans}</b> 人
            </div>
            <div>
              人气：<b>{wangyou.popularity}</b>
            </div>
          </div>

          <div className="wy-more" style={{ marginTop: 12 }}>
            <Link href="/">&gt;&gt; 返回地盘首页</Link>
          </div>
        </div>
      </div>
    </div>
  );
}