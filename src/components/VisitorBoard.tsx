"use client";

import { useEffect, useState } from "react";

const KEY = "wy-visitors-v1";

type Visitor = { name: string; time: string };

function load(): Visitor[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Visitor[];
  } catch {
    return [];
  }
}

export function VisitorBoard() {
  const [list, setList] = useState<Visitor[]>([]);

  useEffect(() => {
    const now = new Date();
    const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const me: Visitor = { name: "神秘网友", time: stamp };
    const prev = load().filter((v) => v.time !== stamp);
    const next = [me, ...prev].slice(0, 12);
    localStorage.setItem(KEY, JSON.stringify(next));
    setList(next);
  }, []);

  return (
    <div>
      <div className="wy-alt">
        最近访客 <span>{list.length}</span> 人（本机记录）
      </div>
      {list.length === 0 ? (
        <div style={{ color: "#888", textAlign: "center", padding: 8 }}>
          还没有访客，你是第一个～
        </div>
      ) : (
        <ul className="wy-visitor-list">
          {list.map((v, i) => (
            <li key={v.time + i}>
              <b>{v.name}</b>
              <span>{v.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}