function(collection){
	  var collection = $.extend({
      title: '',            // the display title of the collection
      caseSensitive: false, // are search terms case sensitive?
      data: null,           // all data and ajax cache
      type: null,           // ('data','ajax','custom', null) auto-detected
      ajax: null,           // jQuery.ajax() object
      cache: true,          // cache ajax results in this.data ?
      keys: null,           // list of search terms if this.type == 'ajax' || 'custom'
      custom: null          // function(linkEl, linkTerm, callback)
    }, collection)

    
    /*******************************************
    Autodetect collection type
    ********************************************/
    
    if(collection.type == null) {
      if(collection.data) {
        collection.type = 'data';
      } else if(collection.ajax) {
        collection.type = 'ajax';
      } else if(collection.custom) {
        collection.type = 'custom';
      } else {
        return false; // cannot autodetect type!!
      }
    }
    
    
    
    /*******************************************
    Generate keys from data if necessary
    ********************************************/
    
    if(collection.type == 'data' && (!collection.keys || collection.keys.length == 0)) {
      collection.keys = [];
      $.each(collection.data, function(key, value){
        collection.keys.push(key);
      })
    }
    
    /*******************************************
    TODO: insert callback into the collection.ajax settings
    ********************************************/
    
    if(collection.type == 'ajax') {
      
    }
    

    
    /*******************************************
    Add collection to global references list and set ID
    ********************************************/
    
    collection.id = $.referenceCollections.push(collection)
    
    return collection;
    
  }