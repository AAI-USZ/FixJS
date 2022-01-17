function(rule) {
          var name = rule[1] || '';
          buf.push(
            ast[1], '.prototype[', JSON.stringify(name), ']',
            ' = function $' + name.replace(/[^\w]+/g, '') + '() {'
          );

          args(rule[2]);

          buf.push('return ');
          body(rule[3], ' && ');
          buf.push('};\n');
        }