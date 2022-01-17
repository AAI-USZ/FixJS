function configureJqueryMobile() {

        $(document).bind('pagebeforecreate', function (e) {

        });

        $(document).bind('pagebeforecreate', function(e) {
            if ($(e.target).filter('#indexPage').length > 0) {
                $('#indexPage').risk_index();
                return;
            }

            if ($(e.target).filter('#AddTaskPage').length > 0) {
                $('#NewTaskForm').risk_task();
                return;
            }

            if ($(e.target).filter('#EmailReportPage').length > 0) {
                $('#EmailReportForm').risk_email_report();
                return;
            }

            if ($(e.target).filter('#NewHazardPage').length > 0) {
                $('#NewHazardForm').risk_hazard();
                return;
            } 
        });

        $(document).bind('pageshow', function (e) {

            if ($(e.target).filter('#MyAssessmentsPage').length > 0) {
                $('#MyAssessmentsPage').risk_my_assessments();
                return;
            }

            if ($(e.target).filter('#ControlsPage').length > 0) {
                $('#ControlsPage').risk_controls();
                return;
            }
            
            if ($(e.target).filter('#WhosPage').length > 0) {
                $('#WhosPage').risk_whos();
                return;
            }
            
            if ($(e.target).filter('#DetailsPage').length > 0) {
                $('#DetailsPage').risk_details();
                return;
            }
        });

        $(document).bind('pagecreate', function (e) {

            if ($(e.target).filter('#InProgressPage').length > 0) {
                $('#InProgressPage').risk_in_progress();
                return;
            }
            
            if ($(e.target).filter('#HazardsPage').length > 0) {
                $('#HazardsPage').risk_hazards();
                return;
            }

            if ($(e.target).filter('#DeleteConfirmPage').length > 0) {
                $('#DeleteConfirmPage').risk_delete();
                return;
            }

            if ($(e.target).filter('#DeleteTaskConfirmPage').length > 0) {
                $('#DeleteTaskConfirmPage').risk_delete_task();
                return;
            }

            if ($(e.target).filter('#DeleteHazardConfirmPage').length > 0) {
                $('#DeleteHazardConfirmPage').risk_delete_hazard();
                return;
            }     
        });

        $(document).bind('pagehide', function (e, args) {


        });
    }