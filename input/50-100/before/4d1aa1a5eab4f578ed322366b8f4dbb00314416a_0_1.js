function(){
  var self = this;

  // If we still have files on the queue, process the first one
  if(this.files.length > 0){
    this.generateDoc(this.files.shift(), function(){
      self.processNextFile();
    });
  }else{
    this.copySharedResources();
  }
}