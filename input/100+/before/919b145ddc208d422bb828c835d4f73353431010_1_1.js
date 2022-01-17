function(offset, line, column, e, es) {
                var raw = e.raw + es.map(function(e){ return e[0] + e[1].raw; }).join('');
                return {list: [e].concat(es.map(function(e){ return e[1]; })), raw: raw};
              }