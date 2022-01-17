function(index, callback){
     this.readBlob(this.get("files")[index]);
     if(this.get("files")[index].name.split('.').pop() == "csv"){
       this.importCSV(this.get("rawText"));
     }else if(this.get("files")[index].name.split('.').pop() == "eaf"){
       this.importXML(this.get("rawText"));
     }
     if(typeof callback == "function"){
       callback();
     }
    }