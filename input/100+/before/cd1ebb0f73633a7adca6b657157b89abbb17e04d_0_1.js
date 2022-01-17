function (code) {
         var type = typeof (code),
             url = "data:text/javascript;base64,";
        
         if (type === "function") {
             code = "(" + code.toString() + ")();";
         } else if (type !== "string") {
             throw Error("A flock.worker must be initialized with a String or a Function.");
         }
         
         url += window.btoa(code);
         return new Worker(url);
     }