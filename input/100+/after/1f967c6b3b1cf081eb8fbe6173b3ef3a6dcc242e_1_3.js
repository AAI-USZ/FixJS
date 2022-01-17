function(done){
			browser.evaluate("$('#toolbox a.h2').trigger('click');");
			
			var message = browser.evaluate("$('#save-msg span').text();");
			expect(message).to.equal('Saving ...');
			
			browser.wait(function(){
				message = browser.evaluate("$('#save-msg span').text();");
				expect(message).to.equal('Saved');
				done();
			});
		}