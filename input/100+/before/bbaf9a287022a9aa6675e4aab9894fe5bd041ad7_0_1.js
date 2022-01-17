function flush() {
      if (atName) {
        var text = trim(atText.join('\n')), match;
        if (atName == 'param') {
          match = text.match(/^\{([^}=]+)(=)?\}\s+(([^\s=]+)|\[(\S+)=([^\]]+)\])\s+(.*)/);
          //  1      12 2     34       4   5   5 6      6  3   7  7
          if (!match) {
            throw new Error("Not a valid 'param' format: " + text);
          }
          var param = {
            name: match[5] || match[4],
            description:self.markdown(text.replace(match[0], match[7])),
            type: match[1],
            optional: !!match[2],
            'default':match[6]
          };
          self.param.push(param);
        } else if (atName == 'returns') {
          match = text.match(/^\{([^}=]+)\}\s+(.*)/);
          if (!match) {
            throw new Error("Not a valid 'returns' format: " + text);
          }
          self.returns = {
            type: match[1],
            description: self.markdown(text.replace(match[0], match[2]))
          };
        } else if(atName == 'requires') {
          match = text.match(/^([^\s]*)\s*([\S\s]*)/);
          self.requires.push({
            name: match[1],
            text: self.markdown(match[2])
          });
        } else if(atName == 'property') {
          match = text.match(/^\{(\S+)\}\s+(\S+)(\s+(.*))?/);
          if (!match) {
            throw new Error("Not a valid 'property' format: " + text);
          }
          var property = new Doc({
            type: match[1],
            name: match[2],
            shortName: match[2],
            description: self.markdown(text.replace(match[0], match[4]))
          });
          self.properties.push(property);
        } else if(atName == 'eventType') {
          match = text.match(/^([^\s]*)\s+on\s+([\S\s]*)/);
          self.type = match[1];
          self.target = match[2];
        } else {
          self[atName] = text;
        }      }
    }
