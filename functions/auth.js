export async function onRequestGet({ env, request }) {
  const clientId = env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response(
      "后台 OAuth 未配置：请在 Cloudflare Pages 环境变量中设置 GITHUB_CLIENT_ID 和 GITHUB_CLIENT_SECRET",
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  const origin = new URL(request.url).origin;
  const redirectUri = `${origin}/callback`;
  const state = crypto.randomUUID();
  const scope = "repo,user";
  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", scope);
  authUrl.searchParams.set("state", state);

  return Response.redirect(authUrl.toString(), 302);
}