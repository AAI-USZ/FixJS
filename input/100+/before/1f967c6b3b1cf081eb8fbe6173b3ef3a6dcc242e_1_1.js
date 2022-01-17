function () {
      expect(browser.success);
      
      browser
				.fill("passcode", newSlider.passcode)
				.pressButton("OK", function(){
					done();
				});
    }