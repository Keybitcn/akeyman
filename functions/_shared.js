export function authResponse(provider, status, content, origins) {
  const allowed = JSON.stringify(origins.split(",").map((o) => o.trim()));
  const payload = JSON.stringify(content);

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>登录中…</title></head><body>
<script>
(function() {
  var origins = ${allowed};
  function hostMatches(origin) {
    var host = origin.replace(/^https?:\\/\\//, "");
    return origins.some(function(item) {
      if (item.indexOf("*") >= 0) {
        var regex = new RegExp("^" + item.replace(/\\./g, "\\\\.").replace(/\\*/g, "[\\\\w.-]+") + "$");
        return regex.test(host);
      }
      return item === host;
    });
  }
  function onMessage(event) {
    if (!hostMatches(event.origin)) return;
    window.opener.postMessage(
      "authorization:${provider}:${status}:${payload}",
      event.origin
    );
  }
  window.addEventListener("message", onMessage, false);
  if (window.opener) {
    window.opener.postMessage("authorizing:${provider}", "*");
  } else {
    document.body.innerHTML = "<p>请从管理页面重新打开登录窗口。</p>";
  }
})();
</script></body></html>`;
}