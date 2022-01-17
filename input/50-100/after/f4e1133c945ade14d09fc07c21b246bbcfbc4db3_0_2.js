function scan(str) {
      var group, res;
      group = (res = this.filter(0, this.basicScan(str)))[0];
      if (this.filters.length) console.log("PARSED: " + group);
      return res;
    }