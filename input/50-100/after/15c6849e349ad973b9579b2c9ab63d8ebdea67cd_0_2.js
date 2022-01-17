function(evt){
    	keydown = true;
    	if(evt.keyCode > 48 && evt.keyCode < 57){
    		keys.key1 = true;
    	}else if(evt.keyCode > 65 && evt.keyCode < 90){
    		keys[evt.keycode-54] = true;
    	}else if(evt.keyCode === 16){
    		keys[37] = true;
    	}
    	keycode = evt.keyCode;
    	console.log(String.fromCharCode(keycode))
    }