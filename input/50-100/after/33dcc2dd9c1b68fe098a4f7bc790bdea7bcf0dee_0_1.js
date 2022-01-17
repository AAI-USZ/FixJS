function(){
        if (this.type === "TEXT" || this.type === "CDATA") {
          return this.content;
        }
        var children = this.children;
        if (children.length === 1 && (children[0].type === "TEXT" || children[0].type === "CDATA")) {
          return children[0].content;
        }
        return null;
      }