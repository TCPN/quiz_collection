async function loadComponent(el, file) {
  const res = await fetch(file);
  const html = await res.text();
  if (typeof el === 'string') {
    el = document.querySelector(el);
  }
  if (!el) {
    throw new Error(`Cannot find the mount point ${el} for ${file}`);
  }
  const replacedHTML = html.replaceAll(/src="([^"]+)"/g, (match, p1) => {
    const newPath = replaceAlias(p1);
    if (newPath) {
      return `src="${newPath}"`;
    }
    return match;
  });
  console.log(replacedHTML);
  el.outerHTML = replacedHTML;
}

function replaceAlias(path) {
  if (path.startsWith('@/')) {
    return path.replace('@/', '/~r04922053/goodtv/'); // this is for csie static server
  }
}