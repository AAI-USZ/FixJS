function(){
	g.input.key = inputState.getKey();
	g.input.mouse = inputState.getMouse();
	
	for(x in g.screenCollection) {
		g.screenCollection[x].update();
	}
	var HTML = '';
	for(x in g.screenCollection) {
		HTML += g.screenCollection[x].draw();
	}
	$('#origins').html(HTML);
	g.frameCounter++;
}