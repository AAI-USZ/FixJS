function duplicate(value) {
      var temp = temporary[state.stack.length];
      state.stack.push("(" + temp + " = " + value + ")");
      state.stack.push(temp);
    }