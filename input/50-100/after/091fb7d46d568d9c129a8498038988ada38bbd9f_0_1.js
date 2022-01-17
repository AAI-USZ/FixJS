function(){
    	var dog = Bulldog.watch('http://fernetjs.com', 10000);
    	dog.url.should.be.a('string');
    	dog.url.should.equal('http://fernetjs.com');
    	dog.interval.should.be.a('number');
    	dog.interval.should.equal(10000);
    }