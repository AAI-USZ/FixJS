function() {
    var on_ready = echollage.on_multiple_ready(1, update);
    collector = echollage.collector('AR6XZ861187FB4CECD', on_ready);
    echollage.display.init();
  }