function(msg) 
	{
		for(var i=0;i<C4.handlers.length;++i){
			if(C4.handlers[i](msg))
				return;
		}
		C4.status("Unexpected message : "+msg);
	}