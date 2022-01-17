function (e) {
    log.warning('Got connection lost notification');
    if (e.errCode == CDO.ErrorCodes.Communication.COMM_REMOTE_END_DIED) {
      log.warn('Connection terminated due to internet connection issues. ' +
                   'Trying to reconnect in 5 seconds');
      CDOT.disconnectHandler();
      CDOT.tryReconnect();
    }
  }