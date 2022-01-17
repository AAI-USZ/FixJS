function(p) {
          if (p.required && !reqParams[p]) throw "missing required parameter: '" + p + "'";
          if (reqParams[p] === undefined) return;

          // validate
          try {
            types[params[p].type](reqParams[p]);
          } catch (e) {
            throw p + ": " + e.toString();
          }
          req.params[p] = reqParams[p];
          delete reqParams[p];
        }