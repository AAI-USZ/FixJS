function (editor, event) {
        var keyCode = event.keyCode;
        
        // Up arrow, down arrow and enter key are always handled here
        if (keyCode === 38 || keyCode === 40 || keyCode === 13) {
            if (event.type === "keydown") {
                if (keyCode === 38) { // Up arrow
                    this.setSelectedIndex(this.selectedIndex - 1);
                } else if (keyCode === 40) { // Down arrow 
                    this.setSelectedIndex(this.selectedIndex + 1);
                } else { // Enter/return key
                    // Trigger a click handler to commmit the selected item
                    $(this.$hintMenu.find("li")[this.selectedIndex]).triggerHandler("click");
                    
                    // Close the list
                    this.close();
                }
            }
            
            event.preventDefault();
            return;
        }
        
        // All other key events trigger a rebuild of the list, but only
        // on keyup events
        if (event.type !== "keyup") {
            return;
        }

        this.updateQueryFromCurPos();
        this.updateList();

        // Update the CodeHistList location
        if (this.displayList.length) {
            var hintPos = this.calcHintListLocation();
            this.$hintMenu.css({"left": hintPos.left, "top": hintPos.top});
        }
    }