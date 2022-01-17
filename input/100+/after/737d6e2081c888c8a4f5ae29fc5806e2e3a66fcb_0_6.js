function () {
    var uids = [self.selectedFeature().uid()];
    var ws = new madrona.features.workspace(app.workspace);
    var uriTemplate = ws.actions.getByTitle("Share")[0];
    var shareURL = uriTemplate.getUrl(uids);
    var jqxhr = $.ajax({
        url: shareURL,
        type: "GET"
    })
    .success( function(data, textStatus, jqXHR) {
        var d = $(data).filter('div');
        $(d).find('div.form_controls').remove();
        $("#share-form-div").empty().append(d);
        $("a.show_members").click(function() { 
            var members = $(this).parent().find('ul.member_list');
            if(members.is(':visible')){
                $(this).find('span').text('show members');
            }else{
                $(this).find('span').text('hide members');
            }
            members.toggle(300);
            return false;
        });
    })
    .error( function(jqXHR, textStatus, errorThrown) {
        $("#share-form-div").html("<div id=\"info info-alert\">Could not load share form.</div>");
        console.log("ERROR", errorThrown, textStatus);
    })
    .complete( function() { 
        $("#scenario-share-dialog").modal("show");
    });
  }