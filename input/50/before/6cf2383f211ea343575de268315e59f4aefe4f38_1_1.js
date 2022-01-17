function cache(options){

  var options = options || {},
      store = store || new MemoryStore(options);

  return store;

}