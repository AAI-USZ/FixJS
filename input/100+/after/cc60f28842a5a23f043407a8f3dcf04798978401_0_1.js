function(evt) {
        $("#diameter_slider").slider('option', 'values', [0, 50]);
        $('#min_diam').html(0);
        $('#max_diam').html(50);
        $("#planted_slider").slider('option', 'values', [min_year, current_year]);
        $("#planted_slider")[0].updateDisplay();
        $("#updated_slider").slider('option', 'values', [min_updated, max_updated]);
        $("#updated_slider")[0].updateDisplay();
        $("#height_slider").slider('option', 'values', [0, 200]);
        $('#min_height').html(0);
        $('#max_height').html(200);
        if (!tm.isNumber(max_plot) && max_plot.indexOf('+') != -1) {
            max_p = parseInt(max_plot.split('+')[0]) + 1;
            m_text = max_p - 1 + "+"
            $("#plot_slider").slider('option', 'values', [min_plot, max_p]);
            $('#min_plot').html(min_plot);
            $('#max_plot').html(m_text);
        }
        else {
            $("#plot_slider").slider('option', 'values', [min_plot, max_plot]);
            $('#min_plot').html(min_plot);
            $('#max_plot').html(max_plot);
        }
        
        $("#steward").val('');
        $("#owner").val('');
        $("#updated_by").val('');
        $("#funding").val('');
        //delete tm.searchParams['diameter_range'];
        //delete tm.searchParams['planted_range'];
        //delete tm.searchParams['updated_range'];
        //delete tm.searchParams['height_range'];
        //delete tm.searchParams['plot_range'];
        //delete tm.searchParams['advanced'];
        //delete tm.searchParams['steward'];
        //delete tm.searchParams['owner'];
        //delete tm.searchParams['updated_by'];
        //delete tm.searchParams['funding'];
        tm.searchParams = {}

        //var checks = $("#options_form input:checked");
        //for(var i=0;i<checks.length;i++) {
        //    delete tm.searchParams[checks[i].id];
        //}
        $("#options_form input:checked").attr('checked', false)  
        //tm.updateSearch();
        tm.trackEvent('Search', 'Reset Advanced');
    }