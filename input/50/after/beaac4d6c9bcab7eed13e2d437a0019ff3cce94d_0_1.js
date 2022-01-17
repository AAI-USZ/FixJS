function setSTDOUT(bool) {
  this.logger.set('level', bool ? -1 : Logger.levels.log);

  return this.standardOutput = !!bool;
}