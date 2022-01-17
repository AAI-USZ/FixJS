function createTag(tree, tag) {
  var elem = {
    pos: {
      beforebegin: tag.start,
      afterbegin: tag.end - tag.start,
      beforeend: null,
      afterend: null
    },
    singleton: false,
    keys: [],
    attr: {}
  };

  // resolve element properties (tagname and attributes)
  var content = tree.content.slice(tag.start + 1, tag.end + 1);
  var buffer = "";
  var attr = {};
  var keys = elem.keys;

  // 0:none 1:tagname, 2:attrname 3:attrvalue
  var state = 1;
  loop:for (var l = content.length, i = 0; i < l; i++) {
    var sign = content[i];

    switch (state) {
      // none: the tagname or the attribute has ended
      case 0:
        switch (sign) {
          case '/': // check for singleton sign
            elem.singleton = true;
            continue loop;
          case '>': // check for tag end
            break loop;
          default:
            // empty sign: skip
            if (isEmpty(sign)) continue loop;
            // assume new attribute
            state = 2;
            attr.start = i + 1;
            buffer += sign;
            continue loop;
        }
      break;

      // tagname: the tagname is in progress
      case 1:
        switch (sign) {
          case '/': // check for singleton sign
            elem.singleton = true;
            state = 0;
            elem.tagname = buffer;
            continue loop;
          case '>': // check for tag end
            state = 0;
            elem.tagname = buffer;
            break loop;
          default:
            // empty sign: out of state
            if (isEmpty(sign)) {
              elem.tagname = buffer;
              buffer = "";
              state = 0;
              continue loop;
            }
            // tagname continues
            buffer += sign;
            continue loop;
        }
      break;

      // attrname: a new attribute has started
      case 2:
        switch (sign) {
          // attribute value should follow
          case '=':
            // set name and skip ' or "
            attr.name = buffer;
            keys.push(buffer);
            buffer = "";
            state = 3;
            i += 1;
            continue loop;
          case '/': // check for singleton sign
            elem.singleton = true;
            state = 0;
            attr.end = i - attr.start;
            attr.name = buffer;
            attr.value = null;
            keys.push(buffer);
            elem.attr[attr.name] = attr;
            continue loop;
          case '>': // check for tag end
            state = 0;
            attr.end = i - attr.start;
            attr.name = buffer;
            attr.value = null;
            keys.push(buffer);
            elem.attr[attr.name] = attr;
            break loop;
          default:
            // empty sign: out of state
            if (isEmpty(sign)) {
              attr.end = i - attr.start;
              attr.name = buffer;
              attr.value = null;
              keys.push(buffer);
              state = 0;

              // save attr and reset buffer
              elem.attr[attr.name] = attr;
              buffer = "";
              attr = {};

              continue loop;
            }

            buffer += sign;
            continue loop;
        }
      break;

      // attrvalue: the attribute
      case 3:
        switch (sign) {
          case '"':
          case '\'':
            attr.end = i - attr.start + 1;
            attr.value = buffer;

            // save attr and reset buffer
            elem.attr[attr.name] = attr;
            buffer = "";
            state = 0;
            attr = {};
            continue loop;
          default:
            buffer += sign;
            continue loop;
        }
      break;

      // something must be wrong
      default:
        throw new Error('could not pass document');
    }
  }

  // check singleton, it is only added if true to reduce copy time
  var singleton = elem.singleton || NO_ENDING_TAG.indexOf(elem.tagname) !== -1;
  if (singleton) {
    elem.singleton = singleton;
  }

  if (!elem.singleton) {
    elem.childrens = [];
  }

  return elem;
}