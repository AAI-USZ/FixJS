function(){
    var root = this.attributes.root;
    var content = this.attributes.content;
    var layout = this.attributes.layout;
    var style = this.attributes.style;
    var code = this.attributes.code;
    var views = this.attributes.views;

    // in case no content and no root are given, it is not possible to root any 
    // of the other properties
    if(!root && !content)
      return;

    if(!root)
      root = this.attributes.root = path.dirname(content);

    if(content.indexOf(".") == 0 || content.indexOf("/") != 0)
      this.attributes.content = content = path.normalize(root+"/"+content);
    
    if(typeof layout == "string" && layout.indexOf(".") == 0 && layout.indexOf("/") != 0)
      this.attributes.layout = path.normalize(root+"/"+layout);

    var prependRoot = function(v){ 
      // packageme driven paths can be objects of packageme/lib/File structure,
      // threfore respecting that usage
      if(typeof v == "object") {
        if(v.fullPath.indexOf(".") == 0 || v.fullPath.indexOf("/") != 0)
          v.fullPath = path.normalize(root+"/"+v.fullPath); 
        return v;
      }

      // just prepend root if given path is relative or it is missing start /
      if(v.indexOf(".") == 0 || v.indexOf("/") != 0)
        return path.normalize(root+"/"+v); 
      else
        return v;
    };

    if(style)
      this.attributes.style = style = _.map(style, prependRoot);
    if(code)
      this.attributes.code = code = _.map(code, prependRoot);
    if(views)
      this.attributes.views = views = _.map(views, prependRoot);
  }