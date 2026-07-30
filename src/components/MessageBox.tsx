"use client";

import { useEffect, useState } from "react";

const KEY = "wy-messages-v1";

type Msg = { name: string; text: string; time: string };

function load(): Msg[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Msg[];
  } catch {
    return [];
  }
}

export function MessageBox() {
  const [list, setList] = useState<Msg[]>([]);
  const [name, setName] = useState("网友");
  const [text, setText] = useState("");

  useEffect(() => {
    setList(load());
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const content = text.trim();
    if (!content) {
      alert("先写点什么吧～");
      return;
    }
    const now = new Date();
    const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const next = [{ name: name.trim() || "网友", text: content, time }, ...list].slice(0, 50);
    localStorage.setItem(KEY, JSON.stringify(next));
    setList(next);
    setText("");
    alert("留言已保存到本机浏览器～");
  }

  return (
    <div>
      <form className="wy-msg-form" onSubmit={submit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="你的昵称"
          maxLength={20}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="给我留个言吧~做纪念"
          maxLength={500}
        />
        <button type="submit">提交留言</button>
      </form>

      <div className="wy-msg-list">
        {list.length === 0 ? (
          <div style={{ color: "#888", padding: "8px 0" }}>还没有留言，来做第一个吧～</div>
        ) : (
          list.map((m, i) => (
            <div className="wy-msg-item" key={m.time + i}>
              <div className="wy-msg-meta">
                <b>{m.name}</b>
                <span>{m.time}</span>
              </div>
              <div>{m.text}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}