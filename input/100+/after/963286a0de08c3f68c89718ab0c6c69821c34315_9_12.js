function lists_reload(subject, callback) {
    switch (subject) {
        case "user":
            $.post("processor.php", { axAction: "reload_user", axValue: 0, id: 0 },
                function(data) {
                    $("#user").html(data);
                    ($("#user").innerHeight()-$("#user table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#user table").css("width",customerColumnWidth-scr);
                    lists_live_filter('user', $('#filt_user').val());
		    lists_write_annotations('user');
                    if (typeof(callback) != "undefined")
                      callback();
                }
            );
    break;
        case "customer":
            $.post("processor.php", { axAction: "reload_customer", axValue: 0, id: 0 },
                function(data) {
                    $("#customer").html(data);
                    ($("#customer").innerHeight()-$("#customer table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#customer table").css("width",customerColumnWidth-scr);
                    lists_live_filter('customer', $('#filter_customer').val());
                    lists_write_annotations('customer');
                    if (typeof(callback) != "undefined")
                      callback();
                }
            );
    break;
        case "project": 
            $.post("processor.php", { axAction: "reload_projects", axValue: 0, id: 0 },
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
            );
    break;
        case "activity": 
            $.post("processor.php", { axAction: "reload_activities", axValue: 0, id: 0, project:selected_project },
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
            );
    break;
    }
}