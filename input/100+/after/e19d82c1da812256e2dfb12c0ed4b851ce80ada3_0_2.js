function() {
        
      

      if (this.$.content.hasNode()) {
               var node = this.$.content.node;
               var nodes = node.children;
               for (i=0; i<nodes.length; i++) {
               if (nodes[i].nodeName == "SCRIPT") {
                       console.log("found script");
                       eval(nodes[i].innerText);
                       }

               nodes[i].baseURI = this.base;
                       }

                       }
	        
        
        this.$.content.render();
    }