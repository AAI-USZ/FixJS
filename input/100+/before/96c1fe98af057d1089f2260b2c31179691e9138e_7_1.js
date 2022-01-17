function _handleShowPerfData() {
        var $perfHeader = $("<div class='modal-header' />")
            .append("<a href='#' class='close'>&times;</a>")
            .append("<h1 class='dialog-title'>Performance Data</h1>")
            .append("<div align=right>Raw data (copy paste out): <textarea rows=1 style='width:30px; height:8px; overflow: hidden; resize: none' id='brackets-perf-raw-data'>" + PerfUtils.getDelimitedPerfData() + "</textarea></div>");
        
        var $perfBody = $("<div class='modal-body' style='padding: 0; max-height: 500px; overflow: auto;' />");

        var $data = $("<table class='zebra-striped condensed-table'>")
            .append("<thead><th>Operation</th><th>Time (ms)</th></thead>")
            .append("<tbody />")
            .appendTo($perfBody);
        
        var makeCell = function (content) {
            return $("<td/>").text(content);
        };
        
        var getValue = function (entry) {
            // entry is either an Array or a number
            if (Array.isArray(entry)) {
                // For Array of values, return: minimum/average/maximum/last
                var i, e, avg, sum = 0, min = Number.MAX_VALUE, max = 0;
                
                for (i = 0; i < entry.length; i++) {
                    e = entry[i];
                    min = Math.min(min, e);
                    sum += e;
                    max = Math.max(max, e);
                }
                avg = Math.round(sum / entry.length);
                return String(min) + "/" + String(avg) + "/" + String(max) + "/" + String(e);
            } else {
                return entry;
            }
        };
            
        var testName;
        var perfData = PerfUtils.perfData;
        for (testName in perfData) {
            if (perfData.hasOwnProperty(testName)) {
                // Add row to error table
                $("<tr/>")
                    .append(makeCell(testName))
                    .append(makeCell(getValue(perfData[testName])))
                    .appendTo($data);
            }
        }
                                                     
        $("<div class='modal hide' />")
            .append($perfHeader)
            .append($perfBody)
            .appendTo(window.document.body)
            .modal({
                backdrop: "static",
                show: true
            });

        // Select the raw perf data field on click since select all doesn't 
        // work outside of the editor
        $("#brackets-perf-raw-data").click(function () {
            $(this).focus().select();
        });
    }