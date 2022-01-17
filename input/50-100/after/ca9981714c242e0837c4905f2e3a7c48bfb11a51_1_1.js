function(){
  		it('should pass something to the callback (cannot be null)', function(done){
	  		dog.on('look', function(obj){
	  			should.exist(obj);
					done();
	  		});	
  		});
  	}