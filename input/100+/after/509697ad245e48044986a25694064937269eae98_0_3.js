function generate (url, callback) {
    url = normalize(base, url);
    fetch(url, check(callback, function (template) {
      var frag = template.doc.createDocumentFragment();
      frag.appendChild(template.doc.documentElement.cloneNode(true));
      var stack = [ wrap(frag) ];
      stack[0].context.source = { file: "foo.js", url: template.url };
      stack[0].funcs = template.funcs;
      xmlify(url, stack, null, 0, check(callback, function () { callback(null, frag.firstChild) }));
    }));
  }