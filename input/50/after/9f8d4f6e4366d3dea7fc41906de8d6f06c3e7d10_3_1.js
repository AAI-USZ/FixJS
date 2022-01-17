function presentValue(value) {
    switch (ReplCore.getType(value)) {
      case 'html':
      case 'svg':
        return getHtml(value);
      default:
        return escapeHtml(Parse.print(value));
    }
  }