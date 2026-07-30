"use client";

export function MessageBox() {
  return (
    <form
      className="wy-msg-form"
      onSubmit={(e) => {
        e.preventDefault();
        alert("留言功能为展示复刻，未接入真实提交～");
      }}
    >
      <textarea name="msg" placeholder="给我留个言吧~做纪念" defaultValue="" />
      <button type="submit">提交留言</button>
    </form>
  );
}