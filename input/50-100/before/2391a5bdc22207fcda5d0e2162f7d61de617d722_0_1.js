function(event){
	var args = $.makeArray( arguments );
	console.log( 'riurik.trigger', event, 'with args:', args.slice(1) );
	$(riurik).trigger.call( $(riurik) , args );
}