function setInsert(a) {
        if (!this.has(a)) {
          this.push(a);
        }
        return this;
      }