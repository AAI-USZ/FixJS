function(root) {
        for (i in this.children) {
          // `parent`
          this.children[i].parent = this;
          // `el`
          if (!this.children[i].el) this.children[i].setElement(this.el, false);
          // `autoRender
          if (this.children[i].autoRender == null) {this.children[i].autoRender = this.autoRender;}
          // `_templater`
          if (this.children[i]._templater == null) {this.children[i]._templater = this._templater;}
          
          // proxy events
          this.children[i].on('all', root._onNodeEvent, root);

          // recurse through children
          this.children[i]._inheritance(root);
          

        }
      }