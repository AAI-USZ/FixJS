function(){
   		var dog = Bulldog.watch('http://fernetjs.com', 10000);
   		dog.should.be.an.instanceof(Bulldog);
    }