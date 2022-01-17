function(event) {
    event.stopPropagation();
    $.colorbox({innerWidth:400, innerHeight:150, inline:true, href:'#download_prompt'});
    return false;
  }