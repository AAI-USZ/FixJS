function () {
    var idx;
    var n = 1000; 
    var bitarrayValues = [0,1,2,3,4,5,6,7,8,9];
    var shelves = new Array(bitarrayValues.length + 2);
    var docs = new Array();
    var result;

    
    // .........................................................................
    // initialise our counters to 0
    // .........................................................................
    
    for (var j = 0; j < shelves.length; ++j) {
      shelves[j] = 0;
    }
    
    // .........................................................................
    // Create a bit array index with one attribute
    // .........................................................................
    
    idx = collection.ensureBitarray("x",bitarrayValues);
        

    // .........................................................................
    // Save n random records
    // .........................................................................
    
    print("Start writing",n," documents into index");
        
    for (var j = 0; j < n; ++j) {
      var value = Math.floor(Math.random()*(bitarrayValues.length + 5));
      var alpha = Math.floor(Math.random()*(bitarrayValues.length + 5));
      var doc;
      
      doc = collection.save({"x":value, "y":{"a":1,"z":String.fromCharCode(97 + alpha)} });      
      docs.push(doc._id);
      if (value > bitarrayValues[bitarrayValues.length - 1]) {
        shelves[shelves.length - 2] = shelves[shelves.length - 2] + 1;
      }
      else {
        shelves[value] = shelves[value] + 1;
      }        
    }
        
    print("End writing",n," documents into index");

    for (var j = 0; j < (shelves.length - 1) ; ++j) {
      shelves[shelves.length - 1] = shelves[shelves.length - 1] + shelves[j];
    }
    
    // .........................................................................
    // Ensure that we have the total number of written documents stored in the
    // last position
    // .........................................................................
    
    assertEqual(shelves[shelves.length - 1], n);        
    
    
    print("Start Lookup");
    print(shelves);
    for (var j = 0; j < bitarrayValues.length; ++j) {
      result = collection.BY_EXAMPLE_BITARRAY(idx.id,{"x":j,"y":6,"z":-1}, null, null);
      assertEqual(result['total'],shelves[j]);
    }

    result = collection.BY_EXAMPLE_BITARRAY(idx.id,{"x":"hi there"}, null, null);
    assertEqual(result['total'],shelves[bitarrayValues.length]);
    
    print("End Lookup");
    return;
  }