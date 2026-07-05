import { authResponse } from "./_shared.js";

export async function onRequestGet({ env, request }) {
  const origins = env.ALLOWED_ORIGIN || "quna.fun,www.quna.fun";
  const token = env.GITHUB_TOKEN;
  const clientId = env.GITHUB_CLIENT_ID;

  if (token && !clientId) {
    return new Response(
      authResponse("github", "success", { token, provider: "github" }, origins),
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  if (!clientId) {
    return new Response(
      "登录未配置：请在 Cloudflare Pages 环境变量中设置 GITHUB_TOKEN，或配置 GITHUB_CLIENT_ID 与 GITHUB_CLIENT_SECRET",
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  const clientSecret = env.GITHUB_CLIENT_SECRET;
  if (!clientSecret) {
    return new Response(
      "OAuth 未配置：请设置 GITHUB_CLIENT_SECRET",
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