function(data){
    imageElement = data.target.find("img");
    if (imageElement.length === 0){
      imageElement = $("<img src=''/>");
      data.target.append(imageElement);
    }
    
    var i;
    for (i = 1; i < data.fadeFrames; i ++){
    	data.target.append("<img src=''/>");
    }
    
    imageElements = data.target.find("img");
    imageElements.hide();    
  }