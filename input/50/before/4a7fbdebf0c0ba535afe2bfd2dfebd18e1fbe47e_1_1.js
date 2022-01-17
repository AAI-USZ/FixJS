function(ctx) {
          var elements = ctx.$elements || (ctx.$elements = {});
          elements[name] = attrs._id || attrs.id;
        }