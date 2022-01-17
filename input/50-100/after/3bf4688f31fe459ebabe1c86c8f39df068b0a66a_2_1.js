function(done){
			var currentSize = browser.evaluate("$('#slider-list>li').length;");
			console.log(currentSize);
			browser.evaluate("$('#prevSlide.addSlide').trigger('click');");

			browser.wait(function(){
				var newsize = browser.evaluate("$('#slider-list>li').length;");
				expect(newsize).to.equal(currentSize+1);
				done();
			});
		}