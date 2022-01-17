function(id){
      if(this.totalUnsynced.indexOf(id) == -1){
        this.totalUnsynced.push(id);
      }
      $(".unsynced-changes").val(this.totalUnsynced.length);
      this.addPouchDoc(id);
    }