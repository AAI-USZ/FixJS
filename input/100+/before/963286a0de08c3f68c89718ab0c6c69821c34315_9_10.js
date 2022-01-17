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