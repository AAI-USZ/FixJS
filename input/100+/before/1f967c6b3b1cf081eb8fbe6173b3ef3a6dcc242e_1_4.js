function(){
		
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
		
		it('should be able to add a new bullet list field', function(done){
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
		});
		
		it('should be able to add a new code-block field', function(done){
			var beforeSize = browser.evaluate("$('#slider-list>li.current code').length;");
			browser.evaluate("$('#toolbox a.icon-list-alt').trigger('click');");
			var afterSize = browser.evaluate("$('#slider-list>li.current code').length;");
			
			expect(afterSize).to.equal(beforeSize+1);			
			
			browser.wait(function(){
			
				browser.visit("http://localhost:3000/slider/" + newSlider.name + "/editor", function () {	      
		      browser
							.fill("passcode", newSlider.passcode)
							.pressButton("OK", function(){
								expect(browser.evaluate("$('#slider-list>li.current code').length;")).to.equal(afterSize);
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
		
		it('should be able to see a link to reload when save fails'
		/*, function(done){
			browser.evaluate("$('#toolbox a.h2').trigger('click');");
			
			var message = browser.evaluate("$('#save-msg span').text();");
			expect(message).to.equal('Saving ...');
			
			browser.evaluate("var slides = sliderio.view.editor.slider.getSlides(); slides = 'fail';");
			browser.evaluate("$('#slider-list>li.current h2').trigger('change');");

			browser.wait(function(){
				message = browser.evaluate("$('#save-msg span').text();");
				expect(message).to.equal('Error');
				message = browser.evaluate("$('#save-msg a').text();");
				expect(message).to.equal('Reload');
				
				done();
			});
		}*/);
		
		it('should be able to revert slider to previous version');
		
	}