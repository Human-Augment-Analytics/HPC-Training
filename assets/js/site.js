// Markdown links work in the GitHub repository. On Pages, Jekyll publishes
// those same files as HTML, so point local links to the rendered pages.
document.querySelectorAll('.content a[href]').forEach((link) => {
  const url = new URL(link.href);
  const siteRoot = '/HPC-Training/';

  if (url.origin !== window.location.origin || !url.pathname.startsWith(siteRoot)) {
    return;
  }

  if (url.pathname.endsWith('.md')) {
    url.pathname = `${url.pathname.slice(0, -3)}.html`;
    link.href = url.href;
  }
});
