function(){
   		var dog =   Bulldog.watch('http://fernetjs.com', 3600);
   		dog.should.be.a(Bulldog); 
    }