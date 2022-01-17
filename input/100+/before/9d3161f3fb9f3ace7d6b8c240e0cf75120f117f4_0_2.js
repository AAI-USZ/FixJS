f      if (typeof(elt) === "string")
        buf.push(elt);
      else if (elt[0] === '{')
        buf.push(maybeEscape(invoke(stack, elt[1])));
      else if (elt[0] === '!')
        buf.push(toString(invoke(stack, elt[1] || '')));
      else if (elt[0] === '#') {
        var block = decorateBlockFn(
          function (data) {
            return template({parent: stack, data: data}, elt[2]);
          }, stack.data);
        block.fn = block;
        block.inverse = decorateBlockFn(
          function (data) {
            return template({parent: stack, data: data}, elt[3] || []);
          }, stack.data);
        buf.push(toString(invoke(stack, elt[1], block)));
      } else if (elt[0] === '>') {
        if (!(elt[1] in partials))
          throw new Error("No such partial '" + elt[1] + "'");
        buf.push(toString(partials[elt[1]](stack.data)));
      } else
        throw new Error("bad element in template");
    });
