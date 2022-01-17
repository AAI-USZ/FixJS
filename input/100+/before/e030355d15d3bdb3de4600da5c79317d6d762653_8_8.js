function(op, snapshot) {
        var component, docPos, part, remainder, textPos, _i, _len;
        textPos = 0;
        docPos = {
          index: 0,
          offset: 0
        };
        for (_i = 0, _len = op.length; _i < _len; _i++) {
          component = op[_i];
          if (typeof component === 'number') {
            remainder = component;
            while (remainder > 0) {
              part = takeDoc(snapshot, docPos, remainder);
              if (typeof part === 'string') textPos += part.length;
              remainder -= part.length || part;
            }
          } else if (component.i !== void 0) {
            if (typeof component.i === 'string') {
              this.emit('insert', textPos, component.i);
              textPos += component.i.length;
            }
          } else {
            remainder = component.d;
            while (remainder > 0) {
              part = takeDoc(snapshot, docPos, remainder);
              if (typeof part === 'string') this.emit('delete', textPos, part);
              remainder -= part.length || part;
            }
          }
        }
      }