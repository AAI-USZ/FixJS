function(data) { 
                    $("#activity").html(data);
                    ($("#activity").innerHeight()-$("#activity table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#activity table").css("width",activityColumnWidth-scr);
                    $('#activity>table>tbody>tr>td>a.preselect#ps'+selected_activity+'>img').attr('src','../skins/'+skin+'/grfx/preselect_on.png');
                    lists_live_filter('activity', $('#filter_activity').val());
		    lists_write_annotations('activity');
        if ($('#row_activity'+selected_activity).length == 0) {
          $('#buzzer').addClass('disabled');
        }
        else {
          $('#buzzer').removeClass('disabled');
        }
        if (typeof(callback) != "undefined")
          callback();
                }