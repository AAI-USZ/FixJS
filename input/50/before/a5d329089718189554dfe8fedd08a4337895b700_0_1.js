function ($injector, database, collection_name) {
	this.$injector = $injector;
	this.collection_ = database.getCollection(collection_name);
	this.collection_name_ = collection_name;
}