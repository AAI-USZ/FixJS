function () {
            report = $("#report_select").val();
            if (report !== 'More Reports') {
                window.location = report;
            }
        }