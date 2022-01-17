function(template){
            var html = template.render( { dashboards : data } );
            App.addHideTooltipListener(function() {
                $("#manageDashboardsDropdown").hide();
            });
            $("#manageDashboardsDropdown").empty();
            $("#manageDashboardsDropdown").show();
            $("#manageDashboardsDropdown").append(html);
            bindPanel();
        }