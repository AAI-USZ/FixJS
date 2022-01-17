function(req){
    		if (req.responseText.length > 0) {
    			var res = eval("("+req.responseText+")");
    			Builder.setCode(el, res["code"]);
    		}
    	}