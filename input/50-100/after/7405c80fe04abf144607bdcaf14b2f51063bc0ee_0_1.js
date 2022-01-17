function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val().trim()) return;

      Todos.create(this.newAttributes());
      this.input.val('');
    }