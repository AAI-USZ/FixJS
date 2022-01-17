function(manage) {
      this.insertView(new setup.View({
        msg: "insert",

        // Need keep true.
        keep: true
      }));

      return manage(this).render();
    }