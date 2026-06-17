// SPA fallback for GitHub Pages project sites (rafgraph/spa-github-pages technique).
// 404.html encodes the requested path into a query and redirects to the base index.html.
// index.html decodes it back via history.replaceState BEFORE the router initializes,
// so a hard-load / refresh on any slide route (e.g. /podlodka-skills-deck/2) works.
import { readFileSync, writeFileSync } from 'node:fs'

const dist = 'dist'
// project page: keep the first path segment ("/podlodka-skills-deck") as the base
const pathSegmentsToKeep = 1

const redirectHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Redirecting…</title>
<script>
  var segs = ${pathSegmentsToKeep};
  var l = window.location;
  l.replace(
    l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
    l.pathname.split('/').slice(0, 1 + segs).join('/') + '/?/' +
    l.pathname.slice(1).split('/').slice(segs).join('/').replace(/&/g, '~and~') +
    (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
    l.hash
  );
</script>
</head><body></body></html>
`

const decodeScript = `<script>
  (function (l) {
    if (l.search[1] === '/') {
      var decoded = l.search.slice(1).split('&').map(function (s) {
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
    }
  })(window.location)
</script>`

writeFileSync(`${dist}/404.html`, redirectHtml)

const indexPath = `${dist}/index.html`
let index = readFileSync(indexPath, 'utf8')
if (!index.includes('~and~')) {
  // inject the decoder as the very first thing inside <head> so it runs before the app
  index = index.replace('<head>', `<head>\n${decodeScript}`)
  writeFileSync(indexPath, index)
}
console.log('SPA fallback written: 404.html + decoder injected into index.html')
