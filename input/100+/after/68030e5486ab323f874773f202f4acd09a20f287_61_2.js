function _showSearchResults(searchResults) {
        var $searchResultsDiv = $("#search-results");
        
        if (searchResults && searchResults.length) {
            var $resultTable = $("<table class='zebra-striped condensed-table' />")
                                .append("<tbody>");
            
            // Count the total number of matches
            var numMatches = 0;
            searchResults.forEach(function (item) {
                numMatches += item.matches.length;
            });
            
            // Show result summary in header
            $("#search-result-summary")
                .text("- " + numMatches + " match" + (numMatches > 1 ? "es" : "") +
                      " in " + searchResults.length + " file" + (searchResults.length > 1 ? "s" : "") +
                     (numMatches > 100 ? " (showing the first 100 matches)" : ""))
                .prepend("&nbsp;");  // putting a normal space before the "-" is not enough
            
            var resultsDisplayed = 0;
            
            searchResults.forEach(function (item) {
                if (item && resultsDisplayed < 100) {
                    var makeCell = function (content) {
                        return $("<td/>").html(content);
                    };
                    
                    var esc = function (str) {
                        str = str.replace(/</g, "&lt;");
                        str = str.replace(/>/g, "&gt;");
                        return str;
                    };
                    
                    var highlightMatch = function (line, start, end) {
                        return esc(line.substr(0, start)) + "<span class='highlight'>" + esc(line.substring(start, end)) + "</span>" + esc(line.substr(end));
                    };
                    
                    // Add row for file name
                    $("<tr class='file-section' />")
                        .append("<td colspan='3'>File: <b>" + item.fullPath + "</b></td>")
                        .click(function () {
                            // Clicking file section header collapses/expands result rows for that file
                            var $fileHeader = $(this);
                            $fileHeader.nextUntil(".file-section").toggle();
                        })
                        .appendTo($resultTable);
                    
                    // Add row for each match in file
                    item.matches.forEach(function (match) {
                        if (resultsDisplayed < 100) {
                            var $row = $("<tr/>")
                                .append(makeCell(" "))      // Indent
                                .append(makeCell("line: " + (match.start.line + 1)))
                                .append(makeCell(highlightMatch(match.line, match.start.ch, match.end.ch)))
                                .appendTo($resultTable);
                            
                            $row.click(function () {
                                CommandManager.execute(Commands.FILE_OPEN, {fullPath: item.fullPath})
                                    .done(function (doc) {
                                        // Opened document is now the current main editor
                                        EditorManager.getCurrentFullEditor().setSelection(match.start, match.end);
                                    });
                            });
                            resultsDisplayed++;
                        }
                    });
                    
                }
            });
            
            $("#search-results .table-container")
                .empty()
                .append($resultTable);
            
            $("#search-results .close")
                .one("click", function () {
                    $searchResultsDiv.hide();
                    EditorManager.resizeEditor();
                });
            
            $searchResultsDiv.show();
        } else {
            $searchResultsDiv.hide();
        }
        
        EditorManager.resizeEditor();
    }