function Interface(classInfo) {
    var ii = classInfo.instanceInfo;
    assert (ii.isInterface());
    this.name = ii.name;
    this.classInfo = classInfo;
  }