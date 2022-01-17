function(){
    Object.keys(this.savers).forEach(function(key){
      var body = this.savers[key].body();
      if (key === 'body' && this.ps[key] !== body) {
        delete this.ps['flavors'];
      }
      this.ps[key] = body;
    }, this);
    background.TBRL.Popup.contents[this.ps.itemUrl] = this.ps;
  }