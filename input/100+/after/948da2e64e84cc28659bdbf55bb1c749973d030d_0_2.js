function preGenerate(file, style) {
  var base = domstream(fs.readFileSync(file)).live(true);

  var head = base.find().only().elem('head').toValue();
  if (!head) throw new Error('a <head> tag must exist');

  var body = base.find().only().elem('body').toValue();
  if (!body) throw new Error('a <body> tag must exist');

  // insert meta tag
  var meta = head.find().only().elem('meta').attr('charset').toValue();
  if (meta === false) {
    head.insert('afterbegin', '<meta charset="utf8">');
    meta = head.find().only().elem('meta').attr('charset').toValue();
  }

  // insert title tag
  var title = head.find().only().elem('title').toValue();
  if (title === false) {
    meta.insert('afterend', '<title></title>');
    title = head.find().only().elem('title').toValue();
  }

  // rewrite existing scripttag
  var scripts = base.find().only().elem('script').toArray();
  scripts.forEach(function (node) {
    if (node.hasAttr('src') === false) return;

    node.setAttr('src', '/static?src=' + querystring.escape(node.getAttr('src')));
  });

  // insert framework files
  title.insert('afterend',
    '<link rel="stylesheet" href="/file/mocha.css">' +
    '<script src="/file/chai.js"></script>' +
    '<script src="/file/mocha.js"></script>' +
    '<script>mocha.setup("' + style + '")</script>' +
    '<script>window.onload = function () { mocha.run() };</script>');

  // insert framework container
  var container = body.find().only().attr('id', 'mocha').toValue();
  if (container === false) {
    body.append('<div id="mocha"></div>');
  }

  return base.live(false);
}