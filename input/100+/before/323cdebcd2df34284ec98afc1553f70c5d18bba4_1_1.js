function() {
            switch (newNode.statements.length) {
              case 0:
                if (canDropLast) {
                  return newNode;
                } else {
                  return (new Undefined).g();
                }
                break;
              case 1:
                return newNode.statements[0];
              default:
                return newNode;
            }
          }