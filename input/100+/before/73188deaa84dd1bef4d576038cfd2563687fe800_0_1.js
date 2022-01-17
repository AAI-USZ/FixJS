function (other) {
    if (!(other instanceof ArrowType)) {
      return false;
    }

    var paramTypes = this.paramTypes;
    var otherParamTypes = other.paramTypes;
    if (otherParamTypes.length != paramTypes.length) {
      return false;
    }

    for (var i = 0, j = paramTypes.length; i < j; i++) {
      if (!paramTypes[i].assignableFrom(otherParamTypes[i])) {
        return false;
      }
    }

    return this.returnType.assignableFrom(other.returnType);
  }