function makeExes(appSchema){

	//var appEx = baleen.makeFromSchema(appSchema, undefined, true, true);
	var editEx = baleen.makeFromSchema(editSchema);
	var clientEx = baleen.makeFromSchema(clientSchema, editEx);
	var responsesEx = baleen.makeFromSchema(responsesSchema, editEx);
	
	//console.log('clientEx: ' + clientSchemaStr)
	return {
		//app: appEx,
		edit: editEx,
		client: clientEx,
		responses: responsesEx,
		editSchema: editSchema
	}
}