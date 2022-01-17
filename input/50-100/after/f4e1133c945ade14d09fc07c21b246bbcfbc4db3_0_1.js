function Scanner() {
      this.tokenPat = new RegExp("\\n *|" + baseTokenPat.source);
      this.tokens = {};
      this.tokenTypes = [];
      this.groupOpens = {
        '(': ')'
      };
      this.groupCloses = {
        ')': 1
      };
      this.filters = [];
      this.filterInfo = Nil;
    }