function() {
      var a, b, body, c, _for;
      a = arguments[0], b = arguments[1], c = arguments[2], body = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
      return _for = new C.ForLoop({
        condition: [a, b, c],
        body: body
      });
    }