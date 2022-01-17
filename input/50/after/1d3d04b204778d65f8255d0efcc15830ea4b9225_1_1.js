function deleteMe(me) {
      delete MathElement[me.id];
      me.eachChild(deleteMe);
    }