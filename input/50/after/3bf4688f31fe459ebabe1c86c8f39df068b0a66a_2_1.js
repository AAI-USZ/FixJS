function(){
				var newsize = browser.evaluate("$('#slider-list>li').length;");
				expect(newsize).to.equal(currentSize+1);
				done();
			}