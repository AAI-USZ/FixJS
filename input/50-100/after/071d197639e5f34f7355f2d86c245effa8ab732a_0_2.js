function(response){
    var p = eval("(" + response + ")");
    var w = parseInt(p.width);
    var h = parseInt(p.height);
    this.num_resolutions = parseInt(p.levels) + 1;
    this.tileSize = { w: 256, h: 256 };
    var result = {
      'max_size': { w: w, h: h },
      'tileSize': this.tileSize,
      'num_resolutions': this.num_resolutions
    };
    return result;
    }