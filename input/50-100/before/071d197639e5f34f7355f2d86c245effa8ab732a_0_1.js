function(server,image,resolution,sds,contrast,k,x,y){
    var r = this.num_resolutions - resolution;
    var f = this.getMultiplier(r, this.tileSize.w);
    var djatoka_x = x*f; var djatoka_y = y*f;
    var src = server + this.url_ver
      + image + "&svc_id=" + this.svc_id
      + "&svc_val_fmt=" + this.svc_val_fmt
      + "&svc.format=image/jpeg&svc.level="
      + resolution + "&svc.rotate=0&svc.region="
      + djatoka_y + "," + djatoka_x + ",256,256";
    return src;
  }