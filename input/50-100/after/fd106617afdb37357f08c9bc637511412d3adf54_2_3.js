function(e){
    var images  = this.images;
    var baseDir = path.dirname(this.get('file'));
    var files   = {};

    forEach(images, function(file){
      //去除重复
      files[path.resolve(baseDir, file)] = 1;
    });

    files = Object.keys(files);

    //获取图片大小
    Api.getImagesSize(files, this.setDef, this);
  }