function() {
        
        
        $("pre code").each(function(){
            var text = $(this).text();
            var lines = text.split("\n"); 
            var newText = "";
            for(var i=0; i<lines.length; i++) {
                var line = lines[i];
                line = line.replace(/</g,'&lt;');
                line = line.replace(/>/g,'&gt;');
                newText += "<span>"+line+" </span>";
            }
            $(this).html(newText);
        });
       

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