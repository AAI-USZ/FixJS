function critical(message) {
  this.logger.critical.apply(this.logger, arguments);

  if (this.cli) return process.exit(1);
  this.emit('error', new Error(message));

  return false;
}