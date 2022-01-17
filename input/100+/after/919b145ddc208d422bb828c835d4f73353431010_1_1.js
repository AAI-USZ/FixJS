function(offset, line, column, e, ws, es, trail) {
                var raw = e.raw + ws + es.map(function(e){ return e[0] + e[1] + e[2].raw + e[3]; }).join('') + trail;
                return {list: [e].concat(es.map(function(e){ return e[2]; })), raw: raw};
              }