function (aData) {
    if (gData.current.memory)
      gData.previous.memory = gData.current.memory;
    gData.current.memory = aData;

    widget.port.emit('update_memory', aData);
    logger.log(config.application.topic_memory_statistics, aData);
  }