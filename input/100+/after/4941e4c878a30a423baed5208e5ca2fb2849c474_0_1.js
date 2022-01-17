function(item) {  
      var x = item.get("x"), y = item.get("y");
      // var t = this.particleSystem.addNode(item.get("id"));
      var t = this.particleSystem.addNode(item.get("id"), {'x':x, 'y':y});
      // item.set({"node": t});
      // console.log(item.get("node").p.x);
      // console.log(item);
      // console.log(t);
      // console.log(t.p.x, t.p.y);
      // console.log(x);
      // console.log(y);
      var parentItem = this.getParent(item);

      // hook up if not null
      var line = null;
      if(parentItem !== null) {
        var u = this.particleSystem.addEdge(
          parentItem.get("id"), item.get("id"), {length:0.75});

        // console.log(this.particleSystem);
        // Draw a line from the parent to the child
        line = this.paper.path(
          "M"+parentItem.get("x")+" "+parentItem.get("y")+"L"+x+" "+y);
          line.attr("stroke-width", "2");
          line.attr("stroke", "#626CF7");
        line.toBack();  
      }

      // Set the text
      var text = this.paper.text(x, y, item.get("description"));
      text.attr("font-size", 32);

      var textWidth = text.getBBox().width + 15;
      var textHeight = text.getBBox().height + 15;

      // Create rectangle for visual effect
      var rect = this.paper.rect(x-(textWidth/2), y-(textHeight/2), textWidth, textHeight);
      rect.attr("r", "10");
      rect.attr("stroke-width", "2");
      rect.attr("stroke", "#626CF7");
      rect.attr("fill", "#CDD1FC");
      
      text.toFront();
      
      //Pointer to the context of the Forest View
      var that = this;
      text.mouseover(function(){
        
        // Store the current text so that we can destroy the hover menu later
        that.currentText = this;
        
        // Clean up any open hover menus
        try {          
          $(".hover_menu").parent().empty().remove();          
        } catch (err) {
          // don't complain
        }
        
        // Create a new hover menu
        // To compensate the size of the text box we added few more pixels
        var hoverMenuView = new hubbubApp.HoverMenuView({
	        showAddItemDialog: that.options.showAddItemDialog,
          top: y+100, left:x-25, id: item.get("id")  //Capture the Item id here
        });

        // Append it to the DOM
        $(that.el).last().append($(hoverMenuView.render().el));
      });
    }