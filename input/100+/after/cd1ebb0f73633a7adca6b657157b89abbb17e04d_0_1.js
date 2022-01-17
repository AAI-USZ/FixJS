function (code) {
         var type = typeof (code),
             url,
             builder;
        
         if (type === "function") {
             code = "(" + code.toString() + ")();";
         } else if (type !== "string") {
             throw Error("A flock.worker must be initialized with a String or a Function.");
         }
         
         if (flock.shim.BlobBuilder) {
             builder = new flock.shim.BlobBuilder();
             builder.append(code);
             url = flock.shim.URL.createObjectURL(builder.getBlob());
         } else {
             url = "data:text/javascript;base64," + window.btoa(code);
         }
         return new Worker(url);
     }