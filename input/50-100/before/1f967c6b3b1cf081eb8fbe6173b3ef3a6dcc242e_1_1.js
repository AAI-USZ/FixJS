function(){
				expect(browser.evaluate("$('#slider-list>li').length;")).to.equal(currentSize+1);
				done();
			}