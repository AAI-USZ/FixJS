function getErrorMessage(e, withMessage) {
    withMessage = typeof withMessage === 'undefined' ? true : withMessage;
    return (e.fileName || sourceIds[e.sourceId]) + ':' + e.line +
      (withMessage ? ' ' + e : '');
  }