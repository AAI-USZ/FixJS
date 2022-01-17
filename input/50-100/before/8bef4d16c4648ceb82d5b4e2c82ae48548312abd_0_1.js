function(done){
  		it('should pass something to the callback (cannot be null)', function(){
	  		dog.on('look', function(obj){
	  			obj.should.not.be.empty;
					done();  			
	  		});	
  		});
  		it('');
  	}