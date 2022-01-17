function (files) {
                fileList = files;
                var dialogHTML = "Quick Open: <input type='text' autocomplete='off' id='quickOpenSearch' style='width: 30em'>";
                that._createDialogDiv(dialogHTML);
                that.$searchField = $("input#quickOpenSearch");


                that.$searchField.smartAutoComplete({
                    source: files,
                    maxResults: 20,
                    minCharLimit: 0,
                    autocompleteFocused: true,
                    forceSelect: false,
                    typeAhead: false,   // won't work right now because smart auto complete 
                                        // using internal raw results instead of filtered results for matching
                    filter: _handleFilter,
                    resultFormatter: _handleResultsFormatter
                });
        
                that.$searchField.bind({
                    itemSelect: function (e, selectedItem) { that._handleItemSelect(selectedItem); },
                    itemFocus: function (e, selectedItem) { that._handleItemFocus(selectedItem); },
                    keydown: function (e) { that._handleKeyDown(e); },
                    keyup: function (e, query) { that._handleKeyUp(e); }
                    // Note: lostFocus event DOESN'T work because auto smart complete catches the key up from shift-command-o and immediately
                    // triggers lostFocus
                });
        
                setSearchFieldValue(prefix, initialString);
            }