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

    if (this.returnType === undefined) {
      return other.returnType === undefined;
    }

    return this.returnType.assignableFrom(other.returnType);
  }