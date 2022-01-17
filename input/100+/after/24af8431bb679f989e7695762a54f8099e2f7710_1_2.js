function initGrid() {
        var settings;
        var series;

        /* Apply default values & config */
        if (window.localStorage) {
            if (window.localStorage['monitorCharts']) {
                runtime.charts = $.parseJSON(window.localStorage['monitorCharts']);
            }
            if (window.localStorage['monitorSettings']) {
                monitorSettings = $.parseJSON(window.localStorage['monitorSettings']);
            }

            $('a[href="#clearMonitorConfig"]').toggle(runtime.charts != null);

            if (runtime.charts != null && monitorProtocolVersion != window.localStorage['monitorVersion']) {
                $('div#emptyDialog').dialog({title: PMA_messages['strIncompatibleMonitorConfig']});
                $('div#emptyDialog').html(PMA_messages['strIncompatibleMonitorConfigDescription']);

                var dlgBtns = {};
                dlgBtns[PMA_messages['strClose']] = function() { $(this).dialog('close'); };

                $('div#emptyDialog').dialog({ 
                    width: 400,
                    buttons: dlgBtns 
                });
            }            
        }

        if (runtime.charts == null) {
            runtime.charts = defaultChartGrid;
        }
        if (monitorSettings == null) {
            monitorSettings = defaultMonitorSettings;
        }

        $('select[name="gridChartRefresh"]').attr('value', monitorSettings.gridRefresh / 1000);
        $('select[name="chartColumns"]').attr('value', monitorSettings.columns);

        if (monitorSettings.gridMaxPoints == 'auto') {
            runtime.gridMaxPoints = Math.round((monitorSettings.chartSize.width - 40) / 12);
        } else {
            runtime.gridMaxPoints = monitorSettings.gridMaxPoints;
        }

        runtime.xmin = new Date().getTime() - server_time_diff - runtime.gridMaxPoints * monitorSettings.gridRefresh;
        runtime.xmax = new Date().getTime() - server_time_diff + monitorSettings.gridRefresh;

        /* Calculate how much spacing there is between each chart */
        $('table#chartGrid').html('<tr><td></td><td></td></tr><tr><td></td><td></td></tr>');
        chartSpacing = {
            width: $('table#chartGrid td:nth-child(2)').offset().left 
                    - $('table#chartGrid td:nth-child(1)').offset().left,
            height: $('table#chartGrid tr:nth-child(2) td:nth-child(2)').offset().top 
                    - $('table#chartGrid tr:nth-child(1) td:nth-child(1)').offset().top
        }
        $('table#chartGrid').html('');
        
        /* Add all charts - in correct order */
        var keys = [];
        $.each(runtime.charts, function(key, value) {
            keys.push(key);
        });
        keys.sort();
        for (var i = 0; i<keys.length; i++)
            addChart(runtime.charts[keys[i]], true);

        /* Fill in missing cells */
        var numCharts = $('table#chartGrid .monitorChart').length;
        var numMissingCells = (monitorSettings.columns - numCharts % monitorSettings.columns) % monitorSettings.columns;
        for (var i = 0; i < numMissingCells; i++) {
            $('table#chartGrid tr:last').append('<td></td>');
        }

        // Empty cells should keep their size so you can drop onto them
        $('table#chartGrid tr td').css('width', chartSize().width + 'px');
        
        buildRequiredDataList();
        refreshChartGrid();
    }