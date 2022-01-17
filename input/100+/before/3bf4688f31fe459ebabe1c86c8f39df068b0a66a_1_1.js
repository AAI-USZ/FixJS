function(){
					browser.wait(2000, function(){
					 browser
						.fill("passcode", newSlider.passcode)
						.pressButton("OK", function(){
							
							expect(browser.evaluate("$('#txtTitle').val();")).to.eql(newTitle);
							expect(browser.text("title")).to.equal(newTitle);
							expect(browser.evaluate("$('#txtInitIndex').val();")).to.eql(newIdx);
							
							browser.visit("http://localhost:3000/slider");
							done();
						});
					});
				}