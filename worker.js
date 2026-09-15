export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const hostname = request.headers.get('host')?.split(':', 1)[0].toLowerCase() || url.hostname;
    let shouldRedirect = false;

    if (hostname === '22389-ae86.com') {
      url.hostname = 'www.22389-ae86.com';
      shouldRedirect = true;
    }

    if (url.pathname === '/index.html') {
      url.pathname = '/';
      shouldRedirect = true;
    } else if (url.pathname.endsWith('.html')) {
      url.pathname = url.pathname.slice(0, -5);
      shouldRedirect = true;
    }

    if (shouldRedirect) return Response.redirect(url.toString(), 308);
    return env.ASSETS.fetch(request);
  }
};
