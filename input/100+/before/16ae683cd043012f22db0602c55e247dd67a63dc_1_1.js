function makeLessObj(elem , arr){
    if(!arr)arr = {};
    
    var tagName = elem.tagName.toLowerCase();
    
    if(elem.id){
      tagName += '#' + elem.id;
    }
    
    if(!arr[tagName])arr[tagName] = {};
    arr[tagName]["@style"] = elem.style.cssText;
    
    //
    if(tagName == 'a'){
      arr[tagName]["&:hover"] = {};
    }
    
    if(elem.className){
      var classNames = elem.className.split(' ');
      var length = classNames.length;
      for(var i = 0; i < length; i++){
        arr[tagName]['&.' + classNames[i]] = {};
      }
    }
    
    var length = elem.children.length;
    for(var i = 0; i < length; i++){
      makeLessObj(elem.children[i] , arr[tagName]);
    }

    return arr;
  }