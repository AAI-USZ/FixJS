function(){
    if(typeof this.attributes.packageme == "undefined")
      this.attributes.packageme = {};

    if(this.attributes.code)
      this.attributes.code = _.extend({
        source: this.attributes.code, 
        format: "js", 
        prefix: "/"+this.cid+"/",
        compile: this.attributes.compile
      }, this.attributes.packageme);

    if(this.attributes.style)
      this.attributes.style = _.extend({
        source: this.attributes.style, 
        format: "css", 
        prefix: "/"+this.cid+"/"
      }, this.attributes.packageme);

    if(this.attributes.views)
      this.attributes.views = _.extend({ 
        sourceFolder: this.attributes.views, 
        format: "html" 
      }, this.attributes.packageme);
  }