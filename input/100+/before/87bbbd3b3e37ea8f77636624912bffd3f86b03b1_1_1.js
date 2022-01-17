function() {
      this.setElement("#import-fullscreen");
      $(this.el).html(this.template(this.model.toJSON()));
      if(this.model.get("datalist") != undefined){
        if(this.model.dataListView != undefined){
          this.model.dataListView.render();
        }
      }
      return this;
    }