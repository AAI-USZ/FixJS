function BitarrayIndexSuite() {
  var ERRORS = internal.errors;
  var cn = "UnitTestsCollectionBitarray";
  var collection = null;
  
  return {

////////////////////////////////////////////////////////////////////////////////
/// @brief set up
////////////////////////////////////////////////////////////////////////////////

  // ...........................................................................
  // jsunity automatically calls this property before each test for you
  // ...........................................................................
  
  setUp : function () {
    internal.db._drop(cn);
    collection = internal.db._create(cn, { waitForSync : false });
  },

////////////////////////////////////////////////////////////////////////////////
/// @brief tear down
////////////////////////////////////////////////////////////////////////////////

  // ...........................................................................
  // jsunity automatically calls this property at the end of each test for you
  // ...........................................................................
  
  tearDown : function () {
    collection.drop();
  },

  // ...........................................................................
  // simple bitarray index creation and lookup
  // ...........................................................................

  testLookupBitarrayIndex_1 : function () {
    var idx;
    var n = 1000; 
    var bitarrayValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,[]];
    var shelves = new Array(bitarrayValues.length + 1);
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
      if (value > bitarrayValues[bitarrayValues.length - 2]) {
        shelves[bitarrayValues.length - 1] = shelves[bitarrayValues.length - 1] + 1;
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
    
    print("End Lookup");
    return;
    
  },
  
  testLookupBitarrayIndex_2 : function () {
  },
  
  

////////////////////////////////////////////////////////////////////////////////
// @brief test: bitarray index creation type 1
////////////////////////////////////////////////////////////////////////////////
  
  testCreationBitarrayIndex_1a : function () {
    var idx;

    try {
      idx = collection.ensureBitarray("a");
    }
    catch(err) {
      return;
    }  
    
    throw("Bitarray index can not be constructed in this fashion");
  },

  testCreationBitarrayIndex_1b : function () {
    var idx;

    try {
      idx = collection.ensureBitarray("a",[0,1,2,3],"b");
    }
    catch(err) {
      return;
    }  
    
    throw("Bitarray index can not be constructed in this fashion");
  },
    
  testCreationBitarrayIndex_1c : function () {
    var idx;

    try {
      idx = collection.ensureBitarray("a",[0,1,2,3],"a",[4,5,6,7]);
    }
    catch(err) {
      return;
    }  
    
    throw("Bitarray index can not be constructed in this fashion");
  },

  testCreationBitarrayIndex_1d : function () {
    var idx;

    try {
      idx = collection.ensureBitarray("a",[0,1,2,3],"b",[4,5,6,7,4]);
    }
    catch(err) {
      return;
    }  
    
    throw("Bitarray index can not be constructed in this fashion");
  },
  
////////////////////////////////////////////////////////////////////////////////
/// @brief test: bitarray index creation type 2
////////////////////////////////////////////////////////////////////////////////
  
  testCreationBitarrayIndex_2 : function () {
    var idx;
   
    
    // .........................................................................
    // Create a bit array index with one attribute
    // .........................................................................
    
    idx = collection.ensureBitarray("a",[0,1,2,3,4,5,6,7,8,9,[]]);
    
    
    // .........................................................................
    // Got through the returned json object and check whether things are as 
    // they should be
    // .........................................................................
    
    assertNotEqual(0, idx.id);                
    assertEqual("bitarray", idx.type);        
    assertEqual(false, idx.unique);
    assertEqual([["a", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, [ ]]]], idx.fields);
    assertEqual(true, idx.isNewlyCreated);

    
    // .........................................................................
    // Attempt to create the index again this time we are going to change 
    // the list of values 
    // .........................................................................

    idx = collection.ensureBitarray("a",["a","b","c","d",0,1,2,3,4,5,6,7,8,9,[]]);
    
    assertNotEqual(0, idx.id);                
    assertEqual("bitarray", idx.type);        
    assertEqual(false, idx.unique);
    assertEqual([["a", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, [ ]]]], idx.fields);
    assertEqual(false, idx.isNewlyCreated);
    
    return;
  },


  testCreationBitarrayIndex_3 : function () {
    var idx;
    var result;
    
    // .........................................................................
    // Create a bit array index with one attribute
    // .........................................................................
    
    idx = collection.ensureBitarray("a",[0,1,2,3,4,5,6,7,8,9,[]]);
    
    
    // .........................................................................
    // Got through the returned json object and check whether things are as 
    // they should be
    // .........................................................................
    
    assertNotEqual(0, idx.id);                
    assertEqual("bitarray", idx.type);        
    assertEqual(false, idx.unique);
    assertEqual([["a", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, [ ]]]], idx.fields);
    assertEqual(true, idx.isNewlyCreated);

    result = collection.dropIndex(idx.id);     
    
    assertEqual(true,result);
    
    // .........................................................................
    // Attempt to create the index again this time we are going to change 
    // the list of values 
    // .........................................................................

    idx = collection.ensureBitarray("a",["a","b","c","d",0,1,2,3,4,5,6,7,8,9,[]]);
    
    assertNotEqual(0, idx.id);                
    assertEqual("bitarray", idx.type);        
    assertEqual(false, idx.unique);
    assertEqual([["a", ["a", "b", "c", "d", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, [ ]]]], idx.fields);
    assertEqual(true, idx.isNewlyCreated);
    
    return;
  },
  
  
  testCreationBitarrayIndex_4 : function () {
    var idx;
   
    
    // .........................................................................
    // Create a bit array index with one attribute
    // .........................................................................
    
    idx = collection.ensureBitarray("x",["male","female","other"],"y",[0,1,3,[]],"z",[{"z1":0},{"z2":1},[[["hello","goodbye"]],0,1,2,3,["4","4a","4b"],5,6,7,8,9],[]]);
    
    
    // .........................................................................
    // Got through the returned json object and check whether things are as 
    // they should be
    // .........................................................................
    assertNotEqual(0, idx.id);                
    assertEqual("bitarray", idx.type);        
    assertEqual(false, idx.unique);
    assertEqual([["x", ["male", "female", "other"]], ["y", [0, 1, 3, [ ]]], ["z", [{ "z1" : 0 }, { "z2" : 1 }, [[["hello","goodbye"]],0, 1, 2, 3, ["4","4a","4b"], 5, 6, 7, 8, 9], [ ]]]], idx.fields);
    assertEqual(true, idx.isNewlyCreated);
    
    return;
  },
  
  testCreationBitarrayIndex_5 : function () {
    var idx;
    var n = 10000;   
    // .........................................................................
    // Create a bit array index with one attribute
    // .........................................................................
    
    idx = collection.ensureBitarray("x",[0,1,2,3,4,5,6,7,8,9,[]]);
    
    print("Start writing",n," documents into index");
    // .........................................................................
    // Save n random records
    // .........................................................................
    
    for (var j = 0; j < n; ++j) {
      var value = Math.floor(Math.random()*10);
      collection.save({"x":value});      
      //print("saved ",j,value);
    }
    
    print("End writing",n," documents into index");
    
    return;
  },

  testCreationBitarrayIndex_6 : function () {
    var idx;
    var n = 10000;   
    // .........................................................................
    // Create a bit array index with one attribute
    // .........................................................................
    
    idx = collection.ensureBitarray("x",[0,1,2,3,4,5,6,7,8,9,[]],"y.z",["a","b","c","d","e","f","g","h","i","j",[]]);
    
    print("Start writing",n," documents into index");
    // .........................................................................
    // Save n random records
    // .........................................................................
    
    for (var j = 0; j < n; ++j) {
      var value = Math.floor(Math.random()*10);
      var alpha = Math.floor(Math.random()*10);
      collection.save({"x":value, "y":{"a":1,"z":String.fromCharCode(97 + alpha)} });      
      //print("saved ",j,value,String.fromCharCode(97 + alpha));
    }
    
    print("End writing",n," documents into index");
    
    return;
  },
  
  testCreationBitarrayIndex_7 : function () {
    var idx;
    var n = 10000; 
    var docs = new Array();
    var visited = new Array();
    // .........................................................................
    // Create a bit array index with one attribute
    // .........................................................................
    
    idx = collection.ensureBitarray("x",[0,1,2,3,4,5,6,7,8,9,[]],"y.z",["a","b","c","d","e","f","g","h","i","j",[]]);
        
    // .........................................................................
    // Save n random records
    // .........................................................................
    
    print("Start writing",n," documents into index");
    
    for (var j = 0; j < n; ++j) {
      var value = Math.floor(Math.random()*10);
      var alpha = Math.floor(Math.random()*10);
      var doc;
      
      doc = collection.save({"x":value, "y":{"a":1,"z":String.fromCharCode(97 + alpha)} });      
      docs.push(doc._id);
      //print("saved ",j,value,String.fromCharCode(97 + alpha), doc);
    }
        
    print("End writing",n," documents into index");

    
    // .........................................................................
    // Remove n random records
    // .........................................................................
    
    print("Start removal ",n," documents into index");
    for (var j = 0; j < n; ++j) {
      var value = Math.floor(Math.random()*n);
      var doc   = docs[value];
      var result;
      //print("a removed ",j,value,doc,visited[doc]);
      if (visited[doc] == undefined) {
        result = collection.remove(doc);      
        visited[doc] = true;
        //print("b removed ",j,value,doc,result);
      }  
    }
    
    print("End removal ",n," documents into index");
    return;
  }
  
  
  };
}