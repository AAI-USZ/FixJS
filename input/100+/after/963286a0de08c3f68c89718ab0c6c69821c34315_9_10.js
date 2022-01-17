function(data) { 
                    $("#project").html(data);
                    ($("#project").innerHeight()-$("#project table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#project table").css("width",projectColumnWidth-scr);
                    $('#project>table>tbody>tr>td>a.preselect#ps'+selected_project+'>img').attr('src','../skins/'+skin+'/grfx/preselect_on.png');
                    lists_live_filter('project', $('#filter_project').val());
                    lists_write_annotations('project');
                    if (typeof(callback) != "undefined")
                      callback();
                }