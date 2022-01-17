function(line,log){
    line = this.format(line,log);
    if(this.connected) {
      //console.log('writing ',line.length,' bytes');
      this.connection.write(line);
    }else this.bufferLine(line); 
  }