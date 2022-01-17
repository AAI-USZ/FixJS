function(){
				var newsize = browser.evaluate("$('#slider-list>li').length;");
				expect(newsize).to.equal(currentSize+1);
				
				browser.evaluate("$('#nextSlide').trigger('click'); $('#nextSlide.addSlide').trigger('click');");
		
				browser.wait(function(){
					expect(browser.evaluate("$('#slider-list>li').length;")).to.equal(newsize+1);
					done(); 
				});
				
			}