function() {
      this.set("corpusname", window.app.get("corpus").get("corpusname"));
      if(this.get("datumFields") == undefined){
        this.set("datumFields",window.app.get("corpus").get("datumFields").clone());
      }
    }