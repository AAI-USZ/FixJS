function(match, name, type) {
        if (type === '') {
          type = 'h';
        }

        if (type === 's') {
          return '" + String((a["' + name + '"] || "")) + "';
        } else {
          return '" + h["' + type + '"]((a["' + name + '"] || "")) + "';
        }

      }