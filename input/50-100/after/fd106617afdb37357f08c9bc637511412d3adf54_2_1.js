function(){
    var cssReader = this.cssReader;
    //收集css规则
    cssReader.on('ruleEnd', this.getRule, this);
    //收集规则结束
    cssReader.on('change:timeEnd', this.cssEnd, this);
    this.on('change:imgPath', this.setImgPath);
  }