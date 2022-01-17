function setSlot(obj, index, value) {
      flushStack();
      var temp = varPool.acquire();
      statements.push(temp + " = " + obj + ".types[" + index + "];");
      statements.push(obj + "[" + obj + ".slots[" + index + "]] = " +
                      temp + " ? " + temp + ".call" + argumentList(temp, value) +
                      " : " + value + ";");
      varPool.release(temp);
    }