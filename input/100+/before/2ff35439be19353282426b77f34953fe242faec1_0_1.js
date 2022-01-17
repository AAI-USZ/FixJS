function filterToOneRowPerUse(items) {
  var results = [];
  var matchEndsWithDashNumber = /-\d+$/;
  // Go through every result
  for (var idx=0; idx < items.length; idx++) {
    
    var newResult;
    var result = items[idx];
    var useCount = parseInt(result['responses']['use-count'], 10);
    
    // If there are multiple uses, loop through all of them.
    if (useCount > 1) {
      var toInclude = {};
      
      // Loop through all the uses
      for (var i=2; i <= useCount; i++) {
        var toFind = "-" + i.toString();      
        toInclude = {};

        // If the the key ends in toFind, let's include it.
        for (var key in result['responses']) {
          if (result['responses'].hasOwnProperty(key)) {
            
            var m = key.match(matchEndsWithDashNumber);
            if (m != null) {
              if (key.endsWith(toFind)) {
                // Strip off the -#
                var endIdx = m['index'];
                var newKey = key.substring(0,endIdx);
                toInclude[newKey] = result['responses'][key];
              };
            }else {
              // Find keys that don't end in -#. 
              // Make sure we don't already have something like this:
              if(!toInclude.hasOwnProperty(key)) {
                toInclude[key] = result['responses'][key];        
              }
            }
            
          };
        };

        newResult = clone(result);
        newResult['responses'] = toInclude;
              
        results.push(newResult);            
      }; // End loop through uses
      
      
      // catch that first set of uses
      toInclude = {};
      for (key in result['responses']) {
        if (result['responses'].hasOwnProperty(key)) {
          if (key.match(/-\d+$/) == null) {
            // Ok, now check if we already have something like this:
            toInclude[key] = result['responses'][key];        
          };
        };
      };
      newResult = clone(result);
      newResult['responses'] = toInclude;
      results.push(newResult);                  
    }else {
      results.push(result);
    }
  }
  
  return results;
}