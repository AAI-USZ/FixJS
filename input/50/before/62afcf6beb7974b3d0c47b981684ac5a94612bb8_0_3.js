function() {
        if (current_group.length) {
          compiled.push("[" + (current_group.join(', ')) + "]");
        }
        return current_group = [];
      }