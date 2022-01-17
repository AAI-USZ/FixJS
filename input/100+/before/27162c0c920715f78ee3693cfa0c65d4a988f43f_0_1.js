function () {
    var shouldLoadCPU = true;
    $('#report-list-nav li a').click(function () {
        if (shouldLoadCPU) {
            shouldLoadCPU = false;
            $.map(['cpu', 'addon', 'module'], function(type) {
                $('#' + type + '_correlation').load(SocReport.base + type + SocReport.path,
                  function (response, status) {
                    if (status == "error") {
                        $('#' + type + '_correlation').html('error, could not load data');
                    } else {
                        socSortCorrelation('#' + type + '_correlation');
                    }
                });
            });
        }
    });
    $('button.load-version-data').click(function () {
        var t = $(this).attr('name');
        $('#' + t + '-panel').html(SocReport.loading).load(SocReport.base + t + SocReport.path, function(response, status){
            if (status == "error") {
                $('#' + t + '-panel').html('error, could not load data');
            }
        });
    });

    $('#reportsList .hang-pair-btn').click(function() {
        var tr = $(this).parent().parent().parent();

        var url = $('input.ajax_endpoint', tr).val();

        $('.hang-pair', tr).html("<img src='../img/ajax-loader16x16.gif' alt='Loading data' />");
        $.getJSON(url, function(data) {
            if (data.length > 0 ) {
	        for (var i=0; data.length; i++) {
	            var hangType = data[i].processType && data[i].processType == 'plugin' ? 'Plugin' : 'Browser';
	            $('.hang-pair', tr).html(hangType + " Hang:<br /><a href='" + data[i].uuid + "'>" + data[i].display_date_processed  + "</a>");
                    $('img', tr).unbind('click');
	            break;
                }
            } else {
                $('.hang-pair', tr).html("Unable to locate other Hang Part.");
            }
        });
        return false;
    });

    $('#buildid-table').tablesorter();

    $.tablesorter.addParser({
        id: "hexToInt",
        is: function(s) {
            return false;
        },
        format: function(s) {
            return parseInt(s, 16);
        },
        type: "digit"
    });

    $('#reportsList').tablesorter({
        textExtraction: "complex",
        headers: {
			3: { sorter: "floating" }, //version
            8: { sorter: "hexToInt" },  // Address
            10: { sorter: "digit" }      // Uptime
        },
        sortList : [[12,1]]
    });

    $('#report-list-nav').tabs({selected: 0}).show();
}