function (hostEditor) {
        this.parentClass.load.call(this, hostEditor);
        
        // Container to hold all editors
        var self = this;

        // Bind event handlers
        this._updateRelatedContainer = this._updateRelatedContainer.bind(this);
        this._ensureCursorVisible = this._ensureCursorVisible.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._onClick = this._onClick.bind(this);

        // Create DOM to hold editors and related list
        this.$editorsDiv = $(window.document.createElement('div')).addClass("inlineEditorHolder");
        
        // Outer container for border-left and scrolling
        this.$relatedContainer = $(window.document.createElement("div")).addClass("related-container");
        this._relatedContainerInserted = false;
        this._relatedContainerInsertedHandler = this._relatedContainerInsertedHandler.bind(this);
        
        // FIXME (jasonsj): deprecated event http://www.w3.org/TR/DOM-Level-3-Events/
        this.$relatedContainer.on("DOMNodeInserted", this._relatedContainerInsertedHandler);
        
        // List "selection" highlight
        this.$selectedMarker = $(window.document.createElement("div")).appendTo(this.$relatedContainer).addClass("selection");
        
        // Inner container
        var $related = $(window.document.createElement("div")).appendTo(this.$relatedContainer).addClass("related");
        
        // Range list
        var $rangeList = $(window.document.createElement("ul")).appendTo($related);
        
        // create range list & add listeners for range textrange changes
        var rangeItemText;
        this._ranges.forEach(function (range, i) {
            // Create list item UI
            var $rangeItem = $(window.document.createElement("li")).appendTo($rangeList);
            _updateRangeLabel($rangeItem, range);
            $rangeItem.mousedown(function () {
                self.setSelectedIndex(i);
            });

            self._ranges[i].$listItem = $rangeItem;
            
            // Update list item as TextRange changes
            $(self._ranges[i].textRange).on("change", function () {
                _updateRangeLabel($rangeItem, range);
            });
            
            // If TextRange lost sync, react just as we do for an inline Editor's lostContent event:
            // close the whole inline widget
            $(self._ranges[i].textRange).on("lostSync", function () {
                self.close();
            });
        });
        
        // select the first range
        self.setSelectedIndex(0);
        
        // attach to main container
        this.$htmlContent.append(this.$editorsDiv).append(this.$relatedContainer);
        
        // initialize position based on the main #editor-holder
        window.setTimeout(this._updateRelatedContainer, 0);
        
        // Changes to the host editor should update the relatedContainer
        // Note: normally it's not kosher to listen to changes on a specific editor,
        // but in this case we're specifically concerned with changes in the given
        // editor, not general document changes.
        $(this.hostEditor).on("change", this._updateRelatedContainer);
        
        // Update relatedContainer when this widget's position changes
        $(this).on("offsetTopChanged", this._updateRelatedContainer);
        
        // Listen to the window resize event to reposition the relatedContainer
        // when the hostEditor's scrollbars visibility changes
        $(window).on("resize", this._updateRelatedContainer);
        
        // Listen for clicks directly on us, so we can set focus back to the editor
        this.$htmlContent.on("click", this._onClick);
    }