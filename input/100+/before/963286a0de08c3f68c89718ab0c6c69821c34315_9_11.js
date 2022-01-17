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