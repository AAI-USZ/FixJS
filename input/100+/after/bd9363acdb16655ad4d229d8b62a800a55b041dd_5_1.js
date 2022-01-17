function select(identifier){
      var node;
      if(typeof identifier === "string"){
        node = this.preview.find(identifier);
      } else {
        node = identifier;
      }
      this.preview.focus();
      if(node.is("img")){
        this.range.selectNode(node[0]);
      } else {
        if(node.length > 1){
          this.range.setStart(node[0],0);
          this.range.setEndAfter(node.last()[0]);
        } else {
          this.range.selectNodeContents(node[0]);
        }
      }
      this.selection.removeAllRanges();
      this.selection.addRange(this.range);
      // set toolbar items active
      return this.click('.preview');
    }