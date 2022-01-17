function createTag(content, tag, parent) {
  // this should have the same order as in copy.js
  var elem = {
    pos: {
      beforebegin: tag.start,
      afterbegin: tag.end - tag.start,
      beforeend: null,
      afterend: null
    },

    modify: false,
    singleton: false,
    tagname: '',

    keys: [],
    attr: {},

    parent: parent
  };

  // resolve element properties (tagname and attributes)
  var tagcontent = content.slice(tag.start + 1, tag.end + 1);
  var buffer, last = 0;
  var attr = {};
  var keys = elem.keys;

  // 0:none 1:tagname, 2:attrname 3:attrsplit 4:attrvalue
  var state = 1;
  loop:for (var l = tagcontent.length, i = 0; i < l; i++) {
    var sign = tagcontent.charCodeAt(i);

    switch (state) {
      // none: the tagname or the attribute has ended
      case 0:
        switch (sign) {
          case 47: // (/) check for singleton sign
            elem.singleton = true;
            continue loop;
          case 62: // (>) check for tag end
            break loop;

          // empty sign: skip
          case 32: // <space> (' ')
          case 9: // <tab> (\t)
          case 13: // <carrier return> (\r)
          case 10: // <line break> (\n)
            continue loop;
          default:
            state = 2;
            attr.start = i + 1;
            last = i;
            continue loop;
        }
      break;

      // tagname: the tagname is in progress
      case 1:
        switch (sign) {
          case 47: // (/) check for singleton sign
            elem.singleton = true;
            state = 0;
            elem.tagname = tagcontent.slice(last, i);
            continue loop;
          case 62: // (>) check for tag end
            state = 0;
            elem.tagname = tagcontent.substr(last, i);
            break loop;

          // empty sign: out of state
          case 32: // <space> (' ')
          case 9: // <tab> (\t)
          case 13: // <carrier return> (\r)
          case 10: // <line break> (\n)
            elem.tagname = tagcontent.slice(last, i);
            state = 0;
            continue loop;

          default: // tagname continues
            continue loop;
        }
      break;

      // attrname: a new attribute has started
      case 2:
        switch (sign) {
          case 61: // (=) attribute value should follow
            // set name and skip ' or "
            buffer = tagcontent.slice(last, i);
            attr.name = buffer;
            keys.push(buffer);
            state = 3;
            last = i + 1;
            continue loop;
          case 47: // (/) check for singleton sign
            elem.singleton = true;
            state = 0;
            attr.end = i - attr.start;
            buffer = tagcontent.slice(last, i);
            attr.name = buffer;
            attr.value = null;
            keys.push(buffer);
            elem.attr[attr.name] = attr;
            continue loop;
          case 62: // (>) check for tag end
            state = 0;
            attr.end = i - attr.start;
            buffer = tagcontent.slice(last, i);
            attr.name = buffer;
            attr.value = null;
            keys.push(buffer);
            elem.attr[attr.name] = attr;
            break loop;

          // empty sign: out of state
          case 32: // <space> (' ')
          case 9: // <tab> (\t)
          case 13: // <carrier return> (\r)
          case 10: // <line break> (\n)
            attr.end = i - attr.start;
            buffer = tagcontent.slice(last, i);
            attr.name = buffer;
            attr.value = null;
            keys.push(buffer);
            state = 0;

            // save attr and reset buffer
            elem.attr[attr.name] = attr;
            attr = {};

            continue loop;

          default:
            continue loop;
        }
      break;

      // attrsplit:
      case 3:
        switch (sign) {
          case 34: // "
          case 39: // '
            state = 4;
            last = i + 1;
            continue loop;
          default:
            state = 4;
            continue loop;
        }
      break;

      // attrvalue: the attribute value
      case 4:
        switch (sign) {
          case 34: // "
          case 39: // '
            attr.end = i - attr.start + 1;
            attr.value = tagcontent.slice(last, i);

            // save attr and reset buffer
            elem.attr[attr.name] = attr;
            state = 0;
            attr = {};
            continue loop;
          case 32: // <space> (' ')
          case 9: // <tab> (\t)
          case 13: // <carrier return> (\r)
          case 10: // <line break> (\n)
          case 47: // (/) check for singleton sign
          case 62: // (>) check for tag end
            attr.end = i - attr.start;
            attr.value = tagcontent.slice(last, i);

            // save attr and reset buffer
            elem.attr[attr.name] = attr;
            state = 0;
            attr = {};
            continue loop;
          default:
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