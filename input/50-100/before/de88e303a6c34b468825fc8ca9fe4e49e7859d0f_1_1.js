function(offset, line, column, ws, e, body) {
              console.log(require('util').inspect(body.cases, false, 9e9, true));
              var raw = 'switch' + ws + (e ? e.raw : '') + body.raw;
              return new Nodes.Switch(e || null, body.cases, body['else'] || null).r(raw).p(line, column);
            }