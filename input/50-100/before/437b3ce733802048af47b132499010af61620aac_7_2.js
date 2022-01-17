function(event) {
    if (event.origin !== ORIGIN)
      return;
    if (event.data.id !== channelId)
      return;
    clearInterval(spamIntervalId);

    event.source.postMessage(
      {
        type: "backlog",
        id: channelId,
        schema: $log.provideSchemaForAllKnownFabs(),
        backlog: LOG_BACKLOG,
      },
      event.origin);
  }