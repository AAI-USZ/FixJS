function () {
            report = $("#report_select").val();
            
            // Handle top crasher selection. If no version was selected in the version drop-down
            // select the top most version and append to the URL.
            if(report.indexOf('topcrasher') !== -1) {
                var selectedVersion = $("#product_version_select").val();
                
                if(selectedVersion === "Current Versions") {
                    selectedVersion = $("#product_version_select").find("option:eq(1)").val();
                    window.location = report + selectedVersion;
                } else {
                    window.location = report;
                }
            } else if (report !== 'More Reports') {
                window.location = report;
            }
        }