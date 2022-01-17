function(data) {
    try{
      clients[data.key].emit('command', data);
    } catch (error) {
      
    }
  }