function() {
      var amount, key, lines;
      lines = [];
      amount = 0;
      for (key in this.data) {
        if (key.length > amount) amount = key.length;
      }
      for (key in this.data) {
        lines.push("" + (pad(key, amount)) + key + ": " + (this.get(key)));
      }
      return lines.join("\n");
    }