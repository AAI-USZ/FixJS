function (other) {
    if (!(other instanceof ArrowType)) {
      return false;
    }

    var paramTypes = this.paramTypes;
    var otherParamTypes = other.paramTypes;

    for (var i = 0, j = paramTypes.length; i < j; i++) {
      if (otherParamTypes.length <= i) {
        if (paramTypes[i] !== undefined) {
          // Other arrow has too few params, and this param isn't dyn
          return false;
        } else {
          continue;
        }
      }

      if (paramTypes[i] === undefined) {
        if (otherParamTypes[i] !== undefined) {
          return false;
        }
      } else {
        if (!paramTypes[i].assignableFrom(otherParamTypes[i])) {
          return false;
        }
      }
    }

    for (var i = paramTypes.length, j = otherParamTypes.length; i < j; i++) {
      if (otherParamTypes[i] !== undefined) {
        // Other arrow has more typed params
        return false;
      }
    }

    return this.returnType.assignableFrom(other.returnType);
  }