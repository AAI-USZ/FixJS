function(){
	// canvas = $('#myCanvas').get(0);
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	
	g_elements.push(new Emitter(canvas.width / 2, canvas.height / 2, 5, g_generate));
	reciever = new Reciever(100, 100, 5);
	g_elements.push(reciever);
	// g_elements.push(new WaveForm(pulse));
	
	startDraw();		
}