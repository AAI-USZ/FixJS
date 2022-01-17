function handleReplace(match, name, type, wrap, value) {
        if (type === '') {
          type = 'h';
        }

        if (type === 's') {
          return '" + String((a["' + name + '"] || "")) + "';
        } else {
          if (value) {
            return '" + h["' + type + '"]' +
                    '(a["' + name + '"] || "", "' + (value || '') + '") + "';
          } else {
            return '" + h["' + type + '"](a["' + name + '"] || "") + "';
          }
        }
      }