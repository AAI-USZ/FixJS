function editChart(chartObj) {
        var htmlnode = chartObj.options.chart.renderTo;
        if (! htmlnode ) {
            return;
        }
        
        var chart = null;
        var chartKey = null;
        $.each(runtime.charts, function(key, value) {
            if (value.chart.options.chart.renderTo == htmlnode) {
                chart = value;
                chartKey = key;
                return false;
            }
        });
        
        if (chart == null) {
            return;
        }

        var htmlStr = '<p><b>Chart title: </b> <br/> <input type="text" size="35" name="chartTitle" value="' + chart.title + '" />';
        htmlStr += '</p><p><b>Series:</b> </p><ol>';
        for (var i = 0; i<chart.nodes.length; i++) {
            htmlStr += '<li><i>' + chart.nodes[i].dataPoints[0].name  + ': </i><br/><input type="text" name="chartSerie-' + i + '" value="' + chart.nodes[i].name + '" /></li>';
        }
        
        dlgBtns = {};
        dlgBtns['Save'] = function() {
            runtime.charts[chartKey].title = $('div#emptyDialog input[name="chartTitle"]').attr('value');
            runtime.charts[chartKey].chart.setTitle({ text: runtime.charts[chartKey].title });
            
            $('div#emptyDialog input[name*="chartSerie"]').each(function() {
                var idx = $(this).attr('name').split('-')[1];
                runtime.charts[chartKey].nodes[idx].name = $(this).attr('value');
                runtime.charts[chartKey].chart.series[idx].name = $(this).attr('value');
            });
            
            $(this).dialog('close');
            saveMonitor();
        };
        dlgBtns['Cancel'] = function() {
            $(this).dialog('close');
        };
        
        $('div#emptyDialog').attr('title', 'Edit chart');
        $('div#emptyDialog').html(htmlStr + '</ol>');
        $('div#emptyDialog').dialog({
            width: 'auto',
            height: 'auto',
            buttons: dlgBtns
        });
    }