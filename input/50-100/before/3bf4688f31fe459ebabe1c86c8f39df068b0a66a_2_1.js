function(){
			browser.visit("http://localhost:3000/slider/" + newSlider.name + "/editor", function () {
	      expect(browser.success);
	      
	      browser
					.fill("passcode", newSlider.passcode)
					.pressButton("OK", function(){
						done();
					});
	    });
    }