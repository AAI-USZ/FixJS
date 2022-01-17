function duplicate(value) {
      var temp = varPool.acquire();
      state.stack.push("(" + temp + " = " + value + ")");
      state.stack.push(temp);
      varPool.release(temp);
    }