function(done){
			var beforeSize = browser.evaluate("$('#slider-list>li.current ul.bulletList').length;");
			browser.evaluate("$('#toolbox a.icon-list-ul').trigger('click');");
			var afterSize = browser.evaluate("$('#slider-list>li.current ul.bulletList').length;");
			
			expect(afterSize).to.equal(beforeSize+1);			
			
			browser.wait(function(){
			
				browser.visit("http://localhost:3000/slider/" + newSlider.name + "/editor", function () {	      
		      browser
							.fill("passcode", newSlider.passcode)
							.pressButton("OK", function(){
								expect(browser.evaluate("$('#slider-list>li.current ul.bulletList').length;")).to.equal(afterSize);
								done();
							});
		    });
			});
		}