function(val){
    //存在url，并且url不是http方式
    var isHttpUrl = val.indexOf('//') > -1;
    var ret = false;
    if (!isHttpUrl){
      var uri = imageUrlReg.exec(val);
      if (uri){
        var imgurl = url.parse(uri[1], true);
        var params = imgurl.query;
        var id = params['id'] || 0;
        //过滤图片
        if (!(PARAMS['nosprite'] in params)){
          ret = imgurl.pathname.replace(/\\+/g, '/');
          //设置第一个图片为sprite图片位置
          if (!this.get('imgPath')){
            this.set('imgPath', path.dirname(ret));
          }

          var preParam = this.get('preParam');
          var _id = this.get('id');
          if (_id == id){
            this.initSpriteConf(params);
            //依次初始化图片配置
            preParam.forEach(this.initSpriteConf, this);
            preParam = [];
          } else if (_id < id){
            //如果id提前出现，既id为0的图片没有出现之前，id是1的已经出现了，把
            //当前参数存在数组preParam中
            var isNewImg = preParam.every(function(params){
              return params.id < id;
            });
            if (isNewImg) preParam.push(params);
          }
          this.set('preParam', preParam);
        }
      }
    }

    return ret;
  }