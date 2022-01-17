function (name, value) {
  if (this.isChunked) throw new Error('can not set attribute after .append or .done');

  var elem = this.elem;
  if (elem.isRoot) throw new Error('can not set attribute on root element');
  if (!elem.modify) throw new Error('container can only be modified while online');

  var keys = elem.keys,
      attr, before, after, start, move;

  var content = name + '="' + value + '"',
      length = content.length;

  // attribute do not exist: do nothing
  if (this.hasAttr(name)) {
    attr = elem.attr[name];

    // get postions and sizes
    before = elem.pos.beforebegin + attr.start;
    after = before + attr.end + 1;
    move = -attr.end - 1 + length;

    // remove element from keys array and attr
    var index = keys.indexOf(name);

    // replace content from document
    replaceContent(this, before, after, content);

    // move following attibutes
    attr.value = value;

    if (move !== 0) {
      attr.end = length - 1;
      moveAttibutePointers(elem, index + 1, move);

      // update all other tags (both start and end) there are to follow
      elem.pos.afterbegin += move;
      moveTagPointers(elem, move);
    }

    return this;
  }

  // get last attribute
  attr = elem.attr[keys[keys.length - 1]];

  start = attr.start + attr.end;
  after = before = elem.pos.beforebegin + start + 1;
  move = length + 1;

  // create attribute
  keys.push(name);
  attr = elem.attr[name] = {
    start: start + 2,
    name: name,
    end: length - 1,
    value: value
  };

  // replace content from document
  replaceContent(this, before, after, " " + content);

  // update all other tags (both start and end) there are to follow
  elem.pos.afterbegin += move;
  moveTagPointers(elem, move);

  return this;
}