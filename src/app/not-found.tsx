import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wy-content-page">
      <div className="wy-box">
        <div className="wy-box-head">页面不存在</div>
        <div className="wy-box-body" style={{ textAlign: "center", padding: 24 }}>
          <p style={{ marginBottom: 12 }}>哎呀，这个页面找不到了～</p>
          <Link href="/">&gt;&gt; 回我的地盘</Link>
        </div>
      </div>
    </div>
  );
}