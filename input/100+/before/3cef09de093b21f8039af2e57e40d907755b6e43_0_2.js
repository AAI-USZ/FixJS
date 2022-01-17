function xmlify (stack, caller, depth, done) {
    var self = {}, elements, layoutNS = "", stop = stack.length - 1, top, returned;

    elements =
    { each: function (record, node) {
        evaluate(node.getAttribute("select"), function (result) {
          var into = node.getAttribute('into')
            , clone
            , i = 0, item;

          next();

          function next () {
            if (i < result.length) {
              stack.unshift(wrap(node.cloneNode(true)));
              stack[0].context[into] = result[i++]; 
              xmlify(stack, stack, stack.length - 1, check(done, function (doc) {
                while (doc.firstChild) {
                  node.parentNode.insertBefore(doc.firstChild, node); 
                }
                next();
              }));
            } else {
              node.parentNode.removeChild(node);
              resume();
            }
          }
        });
      }
    , value: function (record, node) {
        evaluate(node.getAttribute("select"), function (result) {
          var e = node.ownerDocument.createElement(node.getAttribute("element"));
          e.appendChild(node.ownerDocument.createTextNode(result));
          node.parentNode.insertBefore(e, node);
          node.parentNode.removeChild(node);
          record.node = e;
          resume();
        });
      }
    };

    if (children(stack[0].node.firstChild)) {
      done(null, stack[0].node);
    }

    function requisite (attr) {
      var record = stack.shift()
        , into = attr.localName
        , href = attr.nodeValue.replace(/^[^:]+:/, '')
        ;

      resolver(href, "text/javascript", check(done, function (module) {
        record.context[into] = module;
        record.loading++;
        if (visit(record)) resume();
      }));

      return false;
    }

    function include (record) {
      var node = record.node
        , attr = record.include
        , href = attr.nodeValue.replace(/^[^:]+:/, '')
        ;

      fetch(href, check(done, function (template) {
        var callee = [ wrap(template.doc.cloneNode(true)) ]
          , blocks = record.node.getElementsByTagNameNS(attr.nodeValue, '*')
          , i, I
          ;

        callee[0].funcs = template.funcs;

        callee[0].context =
        { source: { file: "foo.js", url: template.url }
        , caller: record.node
        , attrs: record.attrs
        , blocks: {}
        };

        for (i = 0, I = blocks.length; i < I; i++) {
          callee[0].context.blocks[blocks[i].localName] = blocks[i];
        }

        xmlify(callee, stack, depth + 1, check(done, function (doc) {
          doc = node.ownerDocument.importNode(doc, true);
          node.parentNode.insertBefore(doc, node);
          node.parentNode.removeChild(node);
          record.node = doc;
          resume();
        }));
      }));
    }

    function layout (record) {
      var attr = record.layout
        , $ = /^[^:]+:(\w[\w\d]+)?(?:\(([^)]*)\))$/.exec(attr.nodeValue)
        , name = $[1] || "!default"
        , params = $[2] ? $[2].split(/\s*,\s*/) : []
        , i, I
        ;
      for (i = 0, I = params.length; i < I; i++) {
        record.context[params[i]] = get('attrs')[params[i]];
      }
      layoutNS = attr.nodeValue;
    }

    // It appears that blocks are connectors that disappear, while layouts
    // rewrite and replace themselves.
    function block (record, node) {
      var block = get("blocks")[node.localName].cloneNode(true);

      // Here we need to re-enter the context of the caller.
      caller.unshift(wrap(block));

      xmlify(caller, stack, depth + 1, check(done, function (transformed) {
        var child;
        record.node = { nextSibling: node.nextSibling };
        while (child = transformed.firstChild) {
          child = transformed.removeChild(child);
          child.nextSibling = child.previousSibling = null;
          child = node.ownerDocument.importNode(child, true);
          node.parentNode.insertBefore(child, node);
          record.node = child;
        }
        node.parentNode.removeChild(node);
        resume();
      }));
    }

    function resume () {
      var record = stack.shift(), stopped;
      while (stack.length != stop && children(record.node.nextSibling)) {
        record = stack.shift();
      }
      if (!returned && stack.length == stop) {
        returned = true;
        done(null, record.node);
      }
    }

    function get (name) {
      for (var i = stack.length - 1; i != -1; i++)
        if (stack[i].context[name]) return stack[i].context[name];
    }

    function evaluate (source, consumer) {
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
      values.push(function () {
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
        if (!visit(wrap(child))) return false;
      }
      return true;
    }

    function visit (record) {
      var node = record.node, completed, I, attr, attrs = record.attrs, protocol, blocks;
      stack.unshift(record);
      if (node.nodeType == 1) {
        for (I = node.attributes.length; record.loading < I; record.loading++) {
          attr = node.attributes.item(record.loading);
          switch (attr.namespaceURI || 0) {
          case "http://www.w3.org/2000/xmlns/":
            if (protocol = attr.nodeValue.split(/:/).shift()) {
              if (!"require".indexOf(protocol)) return requisite(attr);
              if (!"include".indexOf(protocol)) record.include = attr;
              if (!"layout".indexOf(protocol)) record.layout = attr;
            }
            break;
          case "stencil":
            return attribute(attr);
          case 0:
            attrs[attr.localName] = attr.nodeValue;
          }
        }
        if (record.include) {
          return include(record);
        }
        if (record.layout) {
          layout(record);
        }
        if (node.namespaceURI == layoutNS) {
          return block(record, node);
        } else if ("stencil" == node.namespaceURI && elements[node.localName]) {
          return elements[node.localName](record, node); 
        }
        for (attr in attrs) {
          node.setAttributeNS(null, attr, String(attrs[attr]));
        }
      }
      completed = children(node.firstChild);
      stack.shift();
      return completed;
    }
  }