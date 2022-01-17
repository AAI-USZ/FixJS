function setSlot(obj, index, value) {
      flushStack();
      var t = temporary[0];
      statements.push(t + " = " + obj + ".types[" + index + "];");
      statements.push(obj + "[" + obj + ".slots[" + index + "]] = " +
                      t + " ? " + t + ".call" + argumentList(t, value) +
                      " : " + value + ";");
    }