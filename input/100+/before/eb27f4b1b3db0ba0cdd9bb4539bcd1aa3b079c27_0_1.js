function xmlify (template, done) {
    function requireModule(href) {
      var record = stack.pop()
        , into = href.replace(/^.*\/([^.]+).*$/, "$1");

      resolver(href, "text/javascript", check(done, function (module) {
        record.context[into] = module;
        record.loading++;
        if (visit(record)) resume();
      }));

      return false;
    }

    function resume () {
      var record = stack.pop();
      while (stack.length != 0 && children(record.node.nextSibling)) {
        record = stack.pop();
      }
      if (stack.length == 0) {
        done(null, record.node);
      }
    }

    function evaluate(source, consumer) {
      var context = {}, parameters = [], values = []
        , i, I, name, key, func, callbacks = 0, result;
      for (i = 0, I = stack.length; i < I; i++) {
        for (name in stack[i].context) {
          context[name] = stack[i].context[name];
        }
      }
      for (name in context) parameters.push(name);
      parameters.sort();
      for (i = 0, I = parameters.length; i < I; i++) {
        values.push(context[parameters[i]]);
      }
      key = parameters.join(",") + "|" + source;
      if (!(func = functions[key])) {
        func = Function.apply(Function, parameters.concat([ "callback", "return " + source ]));
        functions[key] = func;
      }
      values.push(function callback () {
        if (callbacks++) throw new Error("multiple callbacks");
        return function (error, result) {
          if (error) done(error);
          else consumer(result);
        }
      });
      try {
        result = func.apply(self, values);
      } catch (error) {
        done(error);
      }
      if (!callbacks) consumer(result);
    }

    function children (child) {
      for (; child != null; child = child.nextSibling) {
        if (!visit(wrap(child))) {
          return false;
        }
      }
      return true;
    }

    function visit (record) {
      var node = record.node, completed, I, attr;
      stack.push(record);
      if (node.nodeType == 1) {
        for (I = node.attributes.length; record.loading < I; record.loading++) {
          attr = node.attributes.item(record.loading);
          if ("stencil" == attr.namespaceURI) {
            if ("require" == attr.localName) {
              return requireModule(attr.nodeValue);
            }
          }
        }
        if ("stencil" == node.namespaceURI && elements[node.localName]) {
          return elements[node.localName](record, node); 
        }
      }
      completed = children(node.firstChild);
      stack.pop();
      return completed;
    }

    var stack = [], self = {}, doc = template.doc.cloneNode(true), elements;

    elements = {
      value: function (record, node) {
        evaluate(node.getAttribute("select"), function (result) {
          var e = node.ownerDocument.createElement(node.getAttribute("element"));
          e.appendChild(node.ownerDocument.createTextNode(result));
          node.parentNode.insertBefore(e, node);
          node.parentNode.removeChild(node);
          resume();
        });
      }
    };

    var root = wrap(doc.documentElement);
    root.context.source = { file: "foo.js" };
    if (visit(root)) done(null, doc.documentElement);
  }