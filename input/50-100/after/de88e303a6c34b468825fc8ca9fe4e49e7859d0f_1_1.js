function(offset, line, column, ws, e, body) {
              var raw = 'switch' + ws + (e ? e.raw : '') + body.raw;
              return new Nodes.Switch(e || null, body.cases, body['else'] || null).r(raw).p(line, column);
            }