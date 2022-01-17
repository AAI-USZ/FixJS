function(){
    var cfg = JSON.stringify(this.sprites);
    //拼图
    Api.mergeImages([this.get('file'), cfg], this.writeCssBack, this);
  }