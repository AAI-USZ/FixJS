function(){
  		it('should pass something to the callback (cannot be null)', function(done){
	  		dog.on('change', function(obj){
	  			obj.should.not.be.empty;
					done();  			
	  		});	
  		});  		
  	}