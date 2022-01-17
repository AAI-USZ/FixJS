function cleanupMacro(list) {
    var head, tail, _ref;
    if ((_ref = typeof list) === 'string' || _ref === 'number') {
      return primToken(function() {
        return String(list);
      })(function() {
        return 0;
      });
    } else if ((list instanceof Token) || (list === Nil)) {
      return list;
    } else if (!(list instanceof Cons)) {
      console.log("WEIRD ITEM AFTER MACRO: " + list);
      return list;
    } else if (list instanceof LexCons) {
      return list.map(cleanupMacro);
    } else {
      head = cleanupMacro(list.head());
      tail = cleanupMacro(list.tail());
      return lexCons(head, (head !== Nil ? head.start() : 0), tail, (tail !== Nil ? tail.end() : 0));
    }
  }