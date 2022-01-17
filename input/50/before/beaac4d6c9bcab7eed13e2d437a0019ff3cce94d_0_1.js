function setSTDOUT(bool) {
  this.logger.set('level', bool ? 0 : 8);

  return this.standardOutput = !!bool;
}