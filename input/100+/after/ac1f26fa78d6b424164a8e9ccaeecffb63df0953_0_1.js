f      var ids, result, selector;
      this.indention = indention;
      if (src == null) src = '';
      this.children = [];
      result = src.match(/^(([\.#]?([a-zA-Z]|\{\{[^\{]*\}\})(([a-zA-Z0-9-_]|\{\{[^\{]*\}\})*))+)(\((.*)\))?(:?$|\s+(.*)$)/);
      if (!result) throw "SyntaxError in line: " + src;
      selector = result[1];
      this.attrs = result[7];
      this.mode = result[8] === ':' ? 'plain' : 'node';
      this.content = result[9];
      this.tag = (selector.match(/^[a-zA-Z\{\}][\{\}a-zA-Z0-9-_]*/) || ['div'])[0];
      if (Node.Tags.indexOf(this.tag) === -1) {
        throw "SyntaxError: Illegel tag name " + this.tag;
      }
      if (Node.VoidTags.indexOf(this.tag) !== -1) this.voidElement = true;
      if (!this.isBlank(this.content) && this.voidElement) {
        throw "SyntaxError: void element can't contain content";
      }
      ids = selector.match(/#[a-zA-Z\{\}][\{\}a-zA-Z0-9-$_]*/g) || [''];
      if (ids instanceof Array && ids.length > 1) {
        throw "SyntaxError: One tag should only have one id";
      }
      this.id = ids[0].slice(1);
      this.classes = selector.match(/\.[a-zA-Z\{\}][\{\}a-zA-Z0-9-$_]*/g) || [''];
      this.classes = this.classes.join(' ').replace(/\./g, '');
      this.compile();
    }
