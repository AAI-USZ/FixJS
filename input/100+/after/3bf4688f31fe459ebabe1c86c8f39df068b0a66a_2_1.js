function(){
	var newSlider = require('../../mocks/newSlider.js').slider;

	beforeEach(function(done){
		console.log('\nentering editor');
		 browser.visit("http://localhost:3000/slider/" + newSlider.name + "/editor", function () {
      expect(browser.success);
      
      browser
				.fill("passcode", newSlider.passcode)
				.pressButton("OK", function(){
					done();
				});
    });
	});
	
	//describe('#manage slides', function(){
	
		it("should be able to append a new slide to the left", function(done){
			var currentSize = browser.evaluate("$('#slider-list>li').length;");
			console.log(currentSize);
			browser.evaluate("$('#prevSlide.addSlide').trigger('click');");

			browser.wait(function(){
				var newsize = browser.evaluate("$('#slider-list>li').length;");
				expect(newsize).to.equal(currentSize+1);
				done();
			});
		});
		
		it("should be able to append a new slide to the right", function(done){
			var currentSize = browser.evaluate("$('#slider-list>li').length;")
			console.log(currentSize);
			browser.evaluate("$('#nextSlide.addSlide').trigger('click');");
		
			browser.wait(function(){
				var newsize = browser.evaluate("$('#slider-list>li').length;");
				expect(newsize).to.equal(currentSize+1);
				done();		
			});
				
		});
		
		it("should be able to insert a slide to the left", function(done){
			var currentSize = browser.evaluate("$('#slider-list>li').length;");
			console.log(currentSize);
			var currentIndex = browser.evaluate("$('#slider-list li.current').index();");
			
			browser.wait(function(){
				browser.evaluate("$('#insertLeft').trigger('click');");
				
				browser.wait(1000, function(){
					expect(browser.evaluate("$('#slider-list>li').length;")).to.equal(currentSize+1);
					expect(browser.evaluate("$('#slider-list li.current').index();")).to.equal(currentIndex);
					done(); 
				});
			});
		});
		
		it("should be able to insert a slide to the right", function(done){
			var currentSize = browser.evaluate("$('#slider-list>li').length;");
			var currentIndex = browser.evaluate("$('#slider-list li.current').index();");
			
			browser.wait(function(){
				browser.evaluate("$('#insertRight').trigger('click');");
				
				browser.wait(1000, function(){
					expect(browser.evaluate("$('#slider-list>li').length;")).to.equal(currentSize+1);
					expect(browser.evaluate("$('#slider-list li.current').index();")).to.equal(currentIndex+1);
					done();
				});
			});
		});
		
		it("should be able to delete the current slide", function(done){
			browser.evaluate("$('#nextSlide.addSlide').trigger('click');");
			browser.evaluate("$('#nextSlide.addSlide').trigger('click');");
			browser.evaluate("$('#prevSlide').trigger('click');");
			
			browser.wait(function(){
				var currentSize = browser.evaluate("$('#slider-list>li').length;");
				var currentIndex = browser.evaluate("$('#slider-list li.current').index();");
				browser.evaluate("$('#deleteCurrent').trigger('click');");
								
				browser.wait(2000, function(){
					expect(browser.evaluate("$('#slider-list>li').length;")).to.equal(currentSize-1);
					expect(browser.evaluate("$('#slider-list li.current').index();")).to.equal(currentIndex);
					browser.wait(done); //wait to save the change
				});
			});
		});
		
	//});
	
	describe('#manage fields', function(){
		
		it('should be able to add a new title field and modify its content', function(done){
			var beforeSize = browser.evaluate("$('#slider-list>li.current h1').length;");
			browser.evaluate("$('#toolbox a.h1').trigger('click');");
			var afterSize = browser.evaluate("$('#slider-list>li.current h1').length;");
			
			expect(afterSize).to.equal(beforeSize+1);
			
			browser.wait(function(){
				
				var valueBefore = browser.evaluate("$('#slider-list>li.current h1').eq(0).val();");
				var valueAfter = "some text H1";
				browser.evaluate("$('#slider-list>li.current h1 textarea').eq(0).val('" + valueAfter + "').trigger('change');");
				
				browser.wait(function(){
				
					browser.visit("http://localhost:3000/slider/" + newSlider.name + "/editor", function () {	      
			      browser
								.fill("passcode", newSlider.passcode)
								.pressButton("OK", function(){
									expect(browser.evaluate("$('#slider-list>li.current h1').length;")).to.equal(afterSize);
									expect(browser.evaluate("$('#slider-list>li.current h1 textarea').eq(0).val();")).to.equal(valueAfter);
									done();
								});
			    });
				});
			});
		});
		
		it('should be able to add a new sub-title field and modify its content', function(done){
			var beforeSize = browser.evaluate("$('#slider-list>li.current h2').length;");
			browser.evaluate("$('#toolbox a.h2').trigger('click');");
			var afterSize = browser.evaluate("$('#slider-list>li.current h2').length;");
			
			expect(afterSize).to.equal(beforeSize+1);
			
			browser.wait(function(){
				var valueBefore = browser.evaluate("$('#slider-list>li.current h2').eq(0).val();");
				var valueAfter = "some text H2";
				browser.evaluate("$('#slider-list>li.current h2 textarea').eq(0).val('" + valueAfter + "').trigger('change');");
				
				browser.wait(function(){
				
					browser.visit("http://localhost:3000/slider/" + newSlider.name + "/editor", function () {	      
			      browser
							.fill("passcode", newSlider.passcode)
							.pressButton("OK", function(){
								expect(browser.evaluate("$('#slider-list>li.current h2').length;")).to.equal(afterSize);
								expect(browser.evaluate("$('#slider-list>li.current h2 textarea').eq(0).val();")).to.equal(valueAfter);
								done();
							});
			    });
				});
			});
		});
		
		it('should be able to add a new image field', function(done){
			var beforeSize = browser.evaluate("$('#slider-list>li.current img').length;");
			browser.evaluate("$('#toolbox a.icon-picture').trigger('click');");
			var afterSize = browser.evaluate("$('#slider-list>li.current img').length;");
			
			expect(afterSize).to.equal(beforeSize+1);			
			
			browser.wait(function(){
			
				browser.visit("http://localhost:3000/slider/" + newSlider.name + "/editor", function () {	      
		      browser
							.fill("passcode", newSlider.passcode)
							.pressButton("OK", function(){
								expect(browser.evaluate("$('#slider-list>li.current img').length;")).to.equal(afterSize);
								done();
							});
		    });
			});
		});
		
		it('should be able to see a mesage with the saving state on field change', function(done){
			browser.evaluate("$('#toolbox a.h2').trigger('click');");
			
			var message = browser.evaluate("$('#save-msg span').text();");
			expect(message).to.equal('Saving ...');
			
			browser.wait(function(){
				message = browser.evaluate("$('#save-msg span').text();");
				expect(message).to.equal('Saved');
				done();
			});
		});
		
	});
	
	
}