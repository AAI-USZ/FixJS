function Collection() {

    util.extend(this, new vegas._Base());
    this.length = 0;

    // Use common array methods
    this.pop = Array.prototype.pop;
    this.push = Array.prototype.push;
    this.reverse = Array.prototype.reverse;
    this.shift = Array.prototype.shift;
    this.sort = Array.prototype.sort;
    this.splice = Array.prototype.splice;
    this.unshift = Array.prototype.unshift;
    this.concat = Array.prototype.concat;
    this.join = Array.prototype.join;
    this.slice = Array.prototype.slice;

  }