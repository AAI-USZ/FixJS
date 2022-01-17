function(){
        if(tracing){
          endTrace();
        }
        // If the tracingstack is empty, add a default node to it
        if(!tracingStack[0]){
          tracingStack[0] = {tag: 'p'};
        }
      }