function lists_reload(subject, callback) {
    switch (subject) {
        case "usr":
            $.post("processor.php", { axAction: "reload_usr", axValue: 0, id: 0 },
                function(data) {
                    $("#usr").html(data);
                    ($("#usr").innerHeight()-$("#usr table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#usr table").css("width",knd_w-scr);
                    lists_live_filter('usr', $('#filt_usr').val());
		    lists_write_annotations('usr');
                    if (typeof(callback) != "undefined")
                      callback();
                }
            );
    break;
        case "knd":
            $.post("processor.php", { axAction: "reload_knd", axValue: 0, id: 0 },
                function(data) {
                    $("#knd").html(data);
                    ($("#knd").innerHeight()-$("#knd table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#knd table").css("width",knd_w-scr);
                    lists_live_filter('knd', $('#filt_knd').val());
                    lists_write_annotations('knd');
                    if (typeof(callback) != "undefined")
                      callback();
                }
            );
    break;
        case "pct": 
            $.post("processor.php", { axAction: "reload_pct", axValue: 0, id: 0 },
                function(data) { 
                    $("#pct").html(data);
                    ($("#pct").innerHeight()-$("#pct table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#pct table").css("width",pct_w-scr);
                    $('#pct>table>tbody>tr>td>a.preselect#ps'+selected_pct+'>img').attr('src','../skins/'+skin+'/grfx/preselect_on.png');
                    lists_live_filter('pct', $('#filt_pct').val());
                    lists_write_annotations('pct');
                    if (typeof(callback) != "undefined")
                      callback();
                }
            );
    break;
        case "evt": 
            $.post("processor.php", { axAction: "reload_evt", axValue: 0, id: 0, pct:selected_pct },
                function(data) { 
                    $("#evt").html(data);
                    ($("#evt").innerHeight()-$("#evt table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#evt table").css("width",evt_w-scr);
                    $('#evt>table>tbody>tr>td>a.preselect#ps'+selected_evt+'>img').attr('src','../skins/'+skin+'/grfx/preselect_on.png');
                    lists_live_filter('evt', $('#filt_evt').val());
		    lists_write_annotations('evt');
        if ($('#row_evt'+selected_evt).length == 0) {
          $('#buzzer').addClass('disabled');
        }
        else {
          $('#buzzer').removeClass('disabled');
        }
        if (typeof(callback) != "undefined")
          callback();
                }
            );
    break;
    }
}