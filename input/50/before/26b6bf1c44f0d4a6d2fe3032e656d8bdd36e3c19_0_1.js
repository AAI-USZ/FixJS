function succHandler() {
    CDOT.scopeId = undefined;
    CDOT.currentConnDescriptor = undefined;
    CDOT.disconnectHandler();
  }