function (initialString) {
        var dialogHTML = 'Find in Files: <input type="text" id="findInFilesInput" style="width: 10em"> <span style="color: #888">(Use /re/ syntax for regexp search)</span>';
        this.result = new $.Deferred();
        this._createDialogDiv(dialogHTML);
        var $searchField = $('input#findInFilesInput');
        var that = this;
        
        $searchField.attr("value", initialString || "");
        $searchField.get(0).select();
        
        $searchField.bind("keydown", function (event) {
            if (event.keyCode === 13 || event.keyCode === 27) {  // Enter/Return key or Esc key
                event.stopPropagation();
                event.preventDefault();
                
                var query = $searchField.val();
                
                if (event.keyCode === 27) {
                    query = null;
                }
                
                that._close(query);
            }
        })
            .blur(function () {
                that._close(null);
            })
            .focus();
        
        return this.result.promise();
    }