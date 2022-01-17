function(index, callback){
      var self = this;
       this.readBlob(this.get("files")[index], function(){
         if(self.get("files")[index].name.split('.').pop() == "csv"){
           self.importCSV(self.get("rawText"), callback);
         }else if(self.get("files")[index].name.split('.').pop() == "eaf"){
           self.importXML(self.get("rawText"), callback);
         }
       });
     
    }