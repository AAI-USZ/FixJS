function() {
    this.clearStl();
    this.solid = new CSG();
    if(this.viewer)
    {
      this.viewer.setCsg(this.solid);
    }
    this.validcsg = false;
    this.enableItems();
  }