function(done){
	var browser = new Browser();
	
	console.log("\ncreating slider mock ..");
	//Fills the form and post it for a new slider
	browser.visit("http://localhost:3000/slider", function () {
		
		browser
			.fill("name", newSlider.name)
			.fill("passcode", newSlider.passcode)
			.fill("title", newSlider.title)
			.fill("description", newSlider.description)
			.pressButton("Create!", done);
			
	});
}