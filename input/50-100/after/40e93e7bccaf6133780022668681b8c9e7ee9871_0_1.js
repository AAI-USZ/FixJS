function (aData) {
    if (gData.current.memory)
      gData.previous.memory = gData.current.memory;
    gData.current.memory = aData;

    widget.port.emit('update_memory', aData);

    // Memory statistics aren't pretty useful yet to be logged
    // See: https://github.com/mozilla/memchaser/issues/106
    //logger.log(config.application.topic_memory_statistics, aData);
  }