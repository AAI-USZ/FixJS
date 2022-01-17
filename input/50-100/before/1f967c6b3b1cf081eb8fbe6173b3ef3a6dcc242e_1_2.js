function(done){
			var currentSize = browser.evaluate("$('#slider-list>li').length;");
			var currentIndex = browser.evaluate("$('#slider-list li.current').index();");
			
			browser.wait(function(){
				browser.evaluate("$('#insertLeft').trigger('click');");
				
				browser.wait(1000, function(){
					expect(browser.evaluate("$('#slider-list>li').length;")).to.equal(currentSize+1);
					expect(browser.evaluate("$('#slider-list li.current').index();")).to.equal(currentIndex);
					done(); 
				});
			});
		}