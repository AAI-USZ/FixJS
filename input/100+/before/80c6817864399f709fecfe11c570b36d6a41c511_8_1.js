function() {

    EdifactParser.name = 'EdifactParser';

    function EdifactParser(seg) {
      this.seg = seg;
      this.ec = this.seg.length;
      this.cc = 1;
      this.ep = this.cp = 0;
    }

    EdifactParser.prototype.segment = function() {
      return this.seg;
    };

    EdifactParser.prototype.checkHasMoreElements = function() {
      if (this.ec <= this.ep) {
        return this.error("No more elements (" + (this.ep + 1) + ":" + this.ec + ")");
      }
    };

    EdifactParser.prototype.checkHasMoreComponents = function() {
      if (this.cc <= this.cp) {
        return this.error("No more components (" + (this.cp + 1) + ":" + this.cc + ")");
      }
    };

    EdifactParser.prototype.checkNoMoreElements = function() {
      if ((this.ep + 1) < this.ec) {
        return this.error("Still more elements (" + (this.ep + 1) + ":" + this.ec + ")");
      }
    };

    EdifactParser.prototype.checkNoMoreComponents = function() {
      if ((this.cp + 1) < this.cc) {
        return this.error("Still more components (" + (this.cp + 1) + ":" + this.cc + ")");
      }
    };

    EdifactParser.prototype.emptyElement = function() {
      this.element();
      if (this.cc !== 0) {
        this.error("Element " + this.seg[this.ep] + " is not empty");
      }
      return this;
    };

    EdifactParser.prototype.expect = function(value) {
      if (!this.verify(value)) {
        this.error("Expected " + value + " but was " + this.seg[this.ep][this.cp]);
      }
      this.cp++;
      return this;
    };

    EdifactParser.prototype.read = function(spec, key) {
      this.checkHasMoreElements();
      this.checkHasMoreComponents();
      if ((spec != null) && (key != null)) {
        spec[key] = this.seg[this.ep][this.cp];
      }
      this.cp++;
      return this;
    };

    EdifactParser.prototype.get = function() {
      this.checkHasMoreElements();
      this.checkHasMoreComponents();
      this.cp++;
      return this.seg[this.ep][this.cp - 1];
    };

    EdifactParser.prototype.readMax = function(spec, key, count) {
      var last;
      this.checkHasMoreElements();
      this.checkHasMoreComponents();
      last = Math.min(this.cc, this.cp + count);
      spec[key] = this.seg[this.ep].slice(this.cp, last).join('');
      this.cp = last;
      return this;
    };

    EdifactParser.prototype.element = function() {
      this.checkHasMoreElements();
      this.checkNoMoreComponents();
      this.ep++;
      this.cp = 0;
      this.cc = this.seg[this.ep].length;
      return this;
    };

    EdifactParser.prototype.moreElements = function() {
      return (this.ep + 1) < this.ec;
    };

    EdifactParser.prototype.moreComponents = function() {
      return this.cp < this.cc;
    };

    EdifactParser.prototype.end = function() {
      this.checkNoMoreElements();
      this.checkNoMoreComponents();
      return this;
    };

    EdifactParser.prototype.expectTag = function(tag) {
      if (this.seg[this.ep][this.cp] !== tag) {
        this.error("Expected " + tag + " but was " + this.seg[this.ep][this.cp]);
      }
      this.cp++;
      return this;
    };

    EdifactParser.prototype.tag = function() {
      return this.seg[0][0];
    };

    EdifactParser.prototype.verify = function(value) {
      this.checkHasMoreElements();
      this.checkHasMoreComponents();
      return this.seg[this.ep][this.cp] === value;
    };

    EdifactParser.prototype.next = function() {
      return this.seg[this.ep][this.cp];
    };

    EdifactParser.prototype.error = function(msg) {
      throw new Error("" + msg + " in element " + this.ep + ":" + this.ec + " component " + this.cp + ":" + this.cc + " " + (JSON.stringify(this.seg)));
    };

    return EdifactParser;

  }