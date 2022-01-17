function Laziness() {
    this.functionStrings = Object.create(null);
    this.functionMap = Object.create(null);
    this.isClosure = false;
    this.needsStub = false;
    this.needsStubF = false;
  }