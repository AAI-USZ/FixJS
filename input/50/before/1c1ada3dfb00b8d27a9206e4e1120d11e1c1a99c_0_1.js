function(line){
    line = this.format(line);
    if(this.connected) {
      //console.log('writing ',line.length,' bytes');
      this.connection.write(line);
    }else this.bufferLine(line); 
  }