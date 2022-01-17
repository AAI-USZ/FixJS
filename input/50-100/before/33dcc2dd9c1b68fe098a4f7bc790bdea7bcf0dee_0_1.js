function(){
        if (this.type === "TEXT") {
          return this.content;
        }
        var children = this.children;
        if (children.length === 1 && children[0].type === "TEXT") {
          return children[0].content;
        }
        return null;
      }