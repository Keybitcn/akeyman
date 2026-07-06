export function authResponse(provider, status, content, origins) {
  const allowed = JSON.stringify(origins.split(",").map((o) => o.trim()));
  const payload = JSON.stringify(content);

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>登录中…</title></head><body>
<p id="status">正在登录，请稍候…</p>
<script>
(function() {
  var provider = ${JSON.stringify(provider)};
  var status = ${JSON.stringify(status)};
  var payload = ${JSON.stringify(payload)};
  var origins = ${allowed};
  var authPrefix = "authorization:" + provider + ":" + status + ":";

  function originAllowed(origin) {
    if (!origin) return false;
    var host = origin.replace(/^https?:\\/\\//, "").replace(/:\\d+$/, "");
    return origins.some(function(item) {
      if (item.indexOf("*") >= 0) {
        var regex = new RegExp("^" + item.replace(/\\./g, "\\\\.").replace(/\\*/g, "[\\\\w.-]+") + "$");
        return regex.test(host);
      }
      return item === host;
    });
  }

  function complete(event) {
    if (!window.opener) return;
    window.opener.postMessage(authPrefix + payload, event.origin);
    document.getElementById("status").textContent = "登录成功，正在关闭窗口…";
    setTimeout(function() { window.close(); }, 300);
  }

  function onMessage(event) {
    if (!originAllowed(event.origin)) return;
    if (event.data === "authorizing:" + provider) {
      complete(event);
    }
  }

  window.addEventListener("message", onMessage, false);
  if (window.opener) {
    window.opener.postMessage("authorizing:" + provider, "*");
  } else {
    document.getElementById("status").textContent = "请从管理页面重新打开登录窗口。";
  }
})();
</script></body></html>`;
}