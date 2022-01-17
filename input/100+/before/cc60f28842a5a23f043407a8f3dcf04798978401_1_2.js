function () {
        tm.loadingSearch = true;
        tm.searchparams = {};
        var params = $.address.parameterNames();
        if (params.length) {
            for (var i = 0; i < params.length; i++) {
                var key = params[i];
                var val = $.address.parameter(key);
                tm.searchParams[key] = val;
                if (val == "true") {
                    $("#"+key).attr('checked', true);
                }
                if (key == "diameter_range") {
                    var dvals = $.address.parameter(key).split("-");
                    $("#diameter_slider").slider('values', 0, dvals[0]);
                    $("#diameter_slider").slider('values', 1, dvals[1]);
                }   
                if (key == "planted_range") {
                    var pvals = $.address.parameter(key).split("-");
                    $("#planted_slider").slider('values', 0, pvals[0]);
                    $("#planted_slider").slider('values', 1, pvals[1]);
                }   
                if (key == "updated_range") {
                    var uvals = $.address.parameter(key).split("-");
                    $("#updated_slider").slider('values', 0, uvals[0]);
                    $("#updated_slider").slider('values', 1, uvals[1]);
                }   
                if (key == "height_range") {
                    var hvals = $.address.parameter(key).split("-");
                    $("#height_slider").slider('values', 0, hvals[0]);
                    $("#height_slider").slider('values', 1, hvals[1]);
                }   
                if (key == "plot_range") {
                    var plvals = $.address.parameter(key).split("-");
                    $("#plot_slider").slider('values', 0, plvals[0]);
                    $("#plot_slider").slider('values', 1, plvals[1]);
                }   
                if (key == "species") {
                    var cultivar = null;
                    tm.updateSpeciesFields('species_search',$.address.parameter(key), '');
                } 
                if (key == "location") {
                    tm.updateLocationFields($.address.parameter(key).replace(/\+/g, " "));
                }    
                if (key == "tree_stewardship") {
                    $("#steward-tree").click();
                    var actions = val.split(',');
                    for (j=0;j<actions.length;j++) {
                        $(".steward-action[value=" + actions[j] + "]").click();
                    }
                }
                if (key == "plot_stewardship") {
                    $("#steward-plot").click();
                    var actions = val.split(',');
                    for (k=0;k<actions.length;k++) {
                        $(".steward-action[value=" + actions[k] + "]").click();
                    }
                }
                if (key == "stewardship_reverse") {
                    $(".steward-reverse[value=" + val + "]").click();
                }
                if (key == "stewardship_range") {
                    var svals = $.address.parameter(key).split("-");
                    var date1 = new Date(parseInt(svals[0] * 1000));
                    var date2 = new Date(parseInt(svals[1] * 1000));

                    $("#steward-date-1").datepicker("setDate", date1).change();
                    $("#steward-date-2").datepicker("setDate", date2).change();
                }
            }    
        }
        tm.loadingSearch = false;
        tm.updateSearch();
    }