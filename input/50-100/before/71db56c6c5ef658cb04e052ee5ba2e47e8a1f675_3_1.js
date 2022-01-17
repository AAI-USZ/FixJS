function() {

      // Display the InsertUnicodesView
      this.setElement($("#insert-unicode"));
      $(this.el).html(this.template({}));

      //Updating Collection View Rendering
      this.insertUnicodesView.el = this.$("#unicodes");
      this.insertUnicodesView.render();

      return this;
    }