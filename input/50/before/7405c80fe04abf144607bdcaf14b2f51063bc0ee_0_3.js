function() {
      return {
        content: this.input.val(),
        order:   Todos.nextOrder(),
        done:    false
      };
    }