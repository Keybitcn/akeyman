import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { MessageBox } from "@/components/MessageBox";
import { PhotoGallery } from "@/components/PhotoGallery";
import { SongList } from "@/components/SongList";
import { VideoList } from "@/components/VideoList";
import { VisitorBoard } from "@/components/VisitorBoard";
import { getAllPosts } from "@/lib/posts";
import { wangyou } from "@/lib/wangyou";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);
  const diaryCount = Math.max(posts.length, wangyou.blogLegacy.length);
  const photoCount = wangyou.albums.reduce((n, a) => n + a.photos.length, 0);

  return (
    <div className="wy-page">
      <div className="wy-main">
        <div className="wy-col-left">
          <div className="wy-box" id="blog">
            <div className="wy-box-head">{wangyou.modules.blog}</div>
            <div className="wy-box-body">
              <div className="wy-alt">
                我目前共有 <span>{diaryCount}</span> 篇日志
              </div>

              {posts.map((post) => (
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
                </div>
              ))}

              {wangyou.blogLegacy.map((item) => (
                <div className="wy-diary-item" key={item.date + item.title}>
                  <h3>
                    <span className="time">{item.date}</span>
                    <br />
                    {item.title}
                  </h3>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: item.html }}
                  />
                </div>
              ))}

              <div className="wy-more">
                <Link href="/blog">&gt;&gt; 查看我的日记</Link>
              </div>
            </div>
          </div>

          <div className="wy-box" id="videos">
            <div className="wy-box-head">{wangyou.modules.video}</div>
            <div className="wy-box-body">
              <div className="wy-alt">
                我目前共有 <span>{wangyou.videos.length}</span> 个影秀节目 · 点击即可播放
              </div>
              <VideoList videos={wangyou.videos} limit={4} moreHref="/videos" />
            </div>
          </div>

          <div className="wy-box" id="message">
            <div className="wy-box-head">{wangyou.modules.message}</div>
            <div className="wy-box-body">
              <MessageBox />
            </div>
          </div>
        </div>

        <div className="wy-col-right">
          <div className="wy-box" id="intro">
            <div className="wy-box-head">{wangyou.profileTitle}</div>
            <div className="wy-box-body">
              <div className="wy-avatar-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="wy-avatar"
                  src={wangyou.avatarLocal || wangyou.avatar}
                  alt={wangyou.nickname}
                />
              </div>
              <ul className="wy-base">
                <li>
                  主人：{wangyou.nickname}{" "}
                  {wangyou.vip ? <em className="wy-vip">VIP用户</em> : null}
                </li>
                <li>{wangyou.verified ? "认证通过" : "未认证"}</li>
                <li>性别：{wangyou.gender}</li>
                <li>年龄：{wangyou.age}</li>
                <li>星座：{wangyou.zodiac}</li>
                <li>所在地：{wangyou.location}</li>
                <li>
                  <Link href="/about">详细资料</Link>
                </li>
                <li>
                  ◎ <Link href="/">到我的地盘逛逛</Link>
                </li>
              </ul>
              <div className="wy-stats">
                <div>
                  鸿热度：<b>{wangyou.hotLevel}</b>
                </div>
                <div>
                  鲜花：<b>{wangyou.flowers}</b> 朵
                </div>
                <div>
                  好友：<b>{wangyou.friends}</b> 人
                </div>
                <div>
                  粉丝：<b>{wangyou.fans}</b> 人
                </div>
                <div>
                  形象照：<b>{wangyou.photoScore}</b> 分
                </div>
                <div>
                  人气：<b>{wangyou.popularity}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="wy-box" id="songs">
            <div className="wy-box-head">{wangyou.modules.songs}</div>
            <div className="wy-box-body">
              <div className="wy-alt">
                我目前共有 <span>{wangyou.songs.length}</span> 个歌秀节目 · 点歌名播放
              </div>
              <SongList songs={wangyou.songs} limit={6} moreHref="/songs" />
            </div>
          </div>

          <div className="wy-box">
            <div className="wy-box-head">{wangyou.modules.visitors}</div>
            <div className="wy-box-body">
              <VisitorBoard />
            </div>
          </div>

          <div className="wy-box">
            <div className="wy-box-head">{wangyou.modules.radio}</div>
            <div className="wy-box-body">
              <div className="wy-alt">
                我目前共有 <span>{wangyou.radios.length}</span> 个播客节目
              </div>
              <SongList songs={wangyou.radios} kind="radio" moreHref="/songs" />
            </div>
          </div>

          <div className="wy-box" id="photos">
            <div className="wy-box-head">{wangyou.modules.photo}</div>
            <div className="wy-box-body">
              <div className="wy-alt">
                我目前共有 <span>{photoCount}</span> 张照片 · 点击放大
              </div>
              <PhotoGallery albums={wangyou.albums} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}