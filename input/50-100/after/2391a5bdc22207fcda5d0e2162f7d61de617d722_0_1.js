function(event){
	var args = $.makeArray( arguments ).slice(1);
	console.log( 'riurik.trigger', event, 'with args:', args );
	$(riurik).trigger.apply( $(riurik) , [event, args] );
}