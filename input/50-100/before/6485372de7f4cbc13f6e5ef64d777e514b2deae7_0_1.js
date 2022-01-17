function (path){
                   if(typeof path !== "string"){
                       console.log("String type is needed for file which is to be read.");
                       return false;
                   }
                   var url = fsUtils.fs.root.toURL() + path;
                   return url;
               }