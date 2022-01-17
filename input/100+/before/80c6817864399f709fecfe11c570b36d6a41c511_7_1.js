function() {

    EdifactLexer.name = 'EdifactLexer';

    function EdifactLexer(callback) {
      this.callback = callback;
      this.segmentCount = 0;
      this.segment = [[]];
      this.string = [];
      this.elementPos = this.componentPos = this.pos = this.segmentCount = 0;
    }

    EdifactLexer.prototype.tokenize = function(data) {
      var c, i, len, released, _results;
      len = data.length;
      i = c = 0;
      released = false;
      _results = [];
      while ((c = data.charCodeAt(i++))) {
        if (c === SEGMENT_TERMINATOR) {
          this.segmentCount += 1;
        }
        if (127 < c) {
          continue;
        }
        if (c < SPACE || c === DEL) {
          continue;
        }
        if (this.segmentCount === 0) {
          this.string[this.pos++] = String.fromCharCode(c);
          continue;
        }
        if (c === SPACE && this.pos === 0) {
          continue;
        }
        if (released) {
          this.string[this.pos++] = String.fromCharCode(c);
          released = false;
          continue;
        }
        if (c === RELEASE_INDICATOR) {
          released = true;
          continue;
        }
        if (c === SEGMENT_TERMINATOR || c === DATA_ELEMENT_SEPARATOR || c === COMPONENT_SEPARATOR) {
          if (this.string.length !== 0) {
            this.segment[this.elementPos][this.componentPos] = this.string.join('');
          }
          if (this.string.length === 0 && c === COMPONENT_SEPARATOR) {
            this.segment[this.elementPos][this.componentPos] = '';
          }
          this.string = [];
          this.pos = 0;
        }
        if (c === SEGMENT_TERMINATOR) {
          this.callback(this.segment);
          this.segment = [[]];
          this.elementPos = this.componentPos = 0;
          continue;
        }
        if (c === DATA_ELEMENT_SEPARATOR) {
          this.elementPos++;
          this.segment[this.elementPos] = [];
          this.componentPos = 0;
          continue;
        }
        if (c === COMPONENT_SEPARATOR) {
          this.componentPos++;
          continue;
        }
        _results.push(this.string[this.pos++] = String.fromCharCode(c));
      }
      return _results;
    };

    return EdifactLexer;

  }