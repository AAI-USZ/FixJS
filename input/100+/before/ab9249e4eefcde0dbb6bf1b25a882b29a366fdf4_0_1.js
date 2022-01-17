function(root) {
        // handle template - if `template` is a string, treat it as a 
        // selector,get the html, and run it through the templating function
        // `_templater`; _templater defaults to `_.template`.
        if (typeof(this.template) == "string") {
          this.template = this.get('_templater')($(this.template).html())
        }

        // add a reference to root
        this.root = root;
        
        for (i in this.children) {
          // `parent`
          this.children[i].parent = this;
          // `el`
          if (!this.children[i].el) this.children[i].setElement(this.el);

          // proxy events
          this.children[i].on('all', root._onNodeEvent, root);

          // recurse through children
          this.children[i]._inheritance(root);
          

        }
      }