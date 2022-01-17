function fragment(html, name) {
    if (name === undefined) fragmentRE.test(html) && RegExp.$1;
    if (!(name in containers)) name = '*';
    var container = containers[name];
    container.innerHTML = '' + html;
    return slice.call(container.childNodes);
  }