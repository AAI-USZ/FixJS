function(response){
    var p = eval("(" + response + ")");
    var w = parseInt(p.width);
    var h = parseInt(p.height);
    var num_resolutions = parseInt(p.levels) + 1;
    var result = {
      'max_size': { w: w, h: h },
      'tileSize': { w: 256, h: 256 },
      'num_resolutions': num_resolutions
    };
    return result;
    }