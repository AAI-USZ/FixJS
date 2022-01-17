function expectException(f, type, message) {
    	if(!type) {
    	    throw new Error("expectException needs a truthy type");
    	}
    	var threw = true,
    	    exc;
    	try {
    	    f();
    	    threw = false;
    	} catch(e) {
    	    exc = e;
    	}
    	ok(threw, "exception expected: " + message);
    	equal(exc.type, type, "exception type: " + message + "(" + typeof(exc) + ")");
    }