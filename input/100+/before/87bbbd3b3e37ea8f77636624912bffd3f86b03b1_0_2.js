function(){
      var filedetails = [];
      var files = this.get("files");
      Utils.debug(files);
      for ( var i = 0, f; f = files[i]; i++) {
        filedetails.push( escape(f.name), f.type
            || 'n/a', ' - ', f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString()
                : 'n/a');
        
        this.readFileIntoRawText(i);
//        this.set("asCSV", this.importCSV(f.getBytes()));
//      this.set("asXML", this.importCSV(f.getBytes()));

      }
      
      var status = this.get("status");
      this.set("fileDetails", filedetails.join('') );
      status = status + filedetails.join('');
      this.set("status", status);
      if (this.get("datalist") == undefined) {
        this.set("datalist",new DataList(
          {
            title : "Data from "+files[0].name,
            description : "This is the data list which would result from the import of these files."
              + this.get("fileDetails"),
            corpusname: this.get("corpusname")
          }));
      }
      this.dataListView = new DataListEditView({model : this.get("datalist")});
      this.dataListView.format = "import";
      this.dataListView.render();
      
      
    }