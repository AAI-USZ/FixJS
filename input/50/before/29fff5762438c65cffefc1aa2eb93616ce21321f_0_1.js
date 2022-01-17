function handleFileLoad(event) 
{
	assets.push( { id: event.id, type: event.type, asset: event.result } );
}