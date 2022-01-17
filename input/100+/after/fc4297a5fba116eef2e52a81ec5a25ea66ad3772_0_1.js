function()
  {
    var pagesize = this.getPageSize();  
  
    $("RB_window").style['width'] = 'auto';
    $("RB_window").style['height'] = 'auto';

    var dimensions = Element.getDimensions($("RB_window"));
    var width = dimensions.width;
    var height = dimensions.height;        
    
    $("RB_window").style['left'] = ((pagesize[0] - width)/2) + "px";
    $("RB_window").style['top'] = ((pagesize[1] - height)/2) + "px";
  }