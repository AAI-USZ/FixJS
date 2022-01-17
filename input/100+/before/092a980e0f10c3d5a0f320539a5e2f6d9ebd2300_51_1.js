function run() {
        var currentDoc = DocumentManager.getCurrentDocument();
        
        var perfTimerDOM,
            perfTimerLint;

        var ext = currentDoc ? PathUtils.filenameExtension(currentDoc.file.fullPath) : "";
        var $lintResults = $("#jslint-results");
        var $goldStar = $("#gold-star");
        
        if (getEnabled() && /^(\.js|\.htm|\.html)$/i.test(ext)) {
            perfTimerLint = PerfUtils.markStart("JSLint linting:\t" + (!currentDoc || currentDoc.file.fullPath));
            var text = currentDoc.getText();
            
            // If a line contains only whitespace, remove the whitespace
            // This should be doable with a regexp: text.replace(/\r[\x20|\t]+\r/g, "\r\r");,
            // but that doesn't work.
            var i, arr = text.split("\n");
            for (i = 0; i < arr.length; i++) {
                if (!arr[i].match(/\S/)) {
                    arr[i] = "";
                }
            }
            text = arr.join("\n");
            
            var result = JSLINT(text, null);

            PerfUtils.addMeasurement(perfTimerLint);
            perfTimerDOM = PerfUtils.markStart("JSLint DOM:\t" + (!currentDoc || currentDoc.file.fullPath));
            
            if (!result) {
                var $errorTable = $("<table class='zebra-striped condensed-table'>")
                                   .append("<tbody>");
                var $selectedRow;
                
                JSLINT.errors.forEach(function (item, i) {
                    if (item) {
                        var makeCell = function (content) {
                            return $("<td/>").text(content);
                        };
                        
                        // Add row to error table
                        var $row = $("<tr/>")
                            .append(makeCell(item.line))
                            .append(makeCell(item.reason))
                            .append(makeCell(item.evidence || ""))
                            .appendTo($errorTable);
                        
                        $row.click(function () {
                            if ($selectedRow) {
                                $selectedRow.removeClass("selected");
                            }
                            $row.addClass("selected");
                            $selectedRow = $row;
                            
                            var editor = EditorManager.getCurrentFullEditor();
                            editor.setCursorPos(item.line - 1, item.character - 1);
                            EditorManager.focusEditor();
                        });
                    }
                });

                $("#jslint-results .table-container")
                    .empty()
                    .append($errorTable);
                $lintResults.show();
                $goldStar.hide();
            } else {
                $lintResults.hide();
                $goldStar.show();
            }

            PerfUtils.addMeasurement(perfTimerDOM);

        } else {
            // JSLint is disabled or does not apply to the current file, hide
            // both the results and the gold star
            $lintResults.hide();
            $goldStar.hide();
        }
        
        EditorManager.resizeEditor();
    }