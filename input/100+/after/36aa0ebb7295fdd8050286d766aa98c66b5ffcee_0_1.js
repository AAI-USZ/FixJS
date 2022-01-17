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
      if(exc) {
          equal(exc.type, type, "exception type: " + message + "(" + typeof(exc) + ")");
      } else {
          ok(false, "failed to throw exception -- can't check type");
      }
    }