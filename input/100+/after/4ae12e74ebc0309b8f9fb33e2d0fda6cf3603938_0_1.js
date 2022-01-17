function populateBricks(){
    // For each row
    for(var k = 0; k < rows; k++){
	// Change color for each row for breakout feel
	var rowcolor = "rgb(255," + (k/rows)*255 + ",0)";
	
	// For each column
	for(var i = 0; i < columns; i++){
	    // Relative width of the brick given the # of columns and width of canvas
	    var relativeWidth = canvas.width / columns;
	    
	    var item = new Brick();
	    item.x = i*relativeWidth;
	    item.y = k*item.height;
	    item.color = rowcolor;
	    
	    // Width - Minus one for differentiation of bricks
	    item.width = (canvas.width / columns)-1;
	    
	    // Height - Minus one for differentiation of bricks 
	    item.height = item.height - 1;
	    
	    // Push brick onto bricks array
	    bricks.push(item);
	}
    }
}