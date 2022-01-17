function() {
      var i = 0,j, trace, l = selections.length, startTrace, endTrace, results, result, key;
      if(testNumber !== undefined){
        i = testNumber*3;
        l = i+3;
      }
      for(; i<l ; i += 3 ){
        startTrace = parseParam(textile,selections[i]);
        if(typeof selections[i] === "string" && typeof selections[i+1] === "number"){
          endTrace = startTrace + selections[i+1];
        } else {
          endTrace = parseParam(textile,selections[i+1],true);
        }
        results = selections[i+2];
        trace = textileCompiler.trace(textile, startTrace, endTrace);
        // console.log(trace);
        equals(trace.length, results.length, "Sequence: " + textile.slice(startTrace, endTrace));
        for(j=0; j<results.length;j++){
          result = results[j];
          if(trace[j]){
            if(typeof result === 'string'){
              equals(trace[j].tag, result);
            } else {
              equals(trace[j].tag, result.tag);
              for(key in result.attr){
                if(result.attr.hasOwnProperty(key)){
                  equals(trace[j].attributes[key], result.attr[key], "on tag " + result.tag);
                }
              }
            }
          }
          else{
            ok(trace[j], "expected trace[" + j + "] to be tag " + (result.tag || result));
          }
        }
      }
    }