function() {
  var boxes = [],
      count = Math.random() * 3;
	  
  for (var i=0; i < count; i++ ) {
	boxCount++;
    var box = document.createElement('div'),
        text = document.createTextNode( boxCount );
    
	var colorNumber = Math.floor(Math.random()*colors.length);
	var boxNumber = Math.floor(Math.random()*boxType.length);
	var contentBoxCount = boxCount%71;
	
    if (contentBoxCount == 0) {
	  box.className = 'brick' + ' ' + 'contentBox' + ' ' + 'lightest';
	  box.appendChild( text );
	  boxes.push( box );
    } else {
      box.className = 'brick' + ' ' + boxType[boxNumber] + ' ' + colors[colorNumber];
      box.appendChild( text );

      // add box DOM node to document fragment
      boxes.push( box );
	}
  }
  return boxes;
}