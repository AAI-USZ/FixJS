function handleFileLoad(event) 
{
	var asset = { id: event.id, type: event.type, result: event.result };
	assets.push( asset );
}