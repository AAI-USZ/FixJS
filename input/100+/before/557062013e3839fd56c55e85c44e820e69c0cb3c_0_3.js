function loadRepo(repo) {
    $("#loading").show();
    $.ajax({
        dataType: 'jsonp',
        url: GITHUB_BASEURL+'repos/'+GITHUB_ORG+"/"+repo+"/pulls",
        success: function (data) {
            $("#loading").hide();
            for (var key in data.data) {
                data.data[key].body = converter.makeHtml(data.data[key].body);
            }
            $("#repoContent").html( $("#repoOverviewTemplate").render([{repoName: repo, pullList: $("#pullRequestListItem").render(data.data)}]));
            $("#repoContent code").parent('p').css('overflow', 'auto');
            $(".pullinstructions").click(function(ev) {
                $('<div></div>').html($("#pullInstructionTemplate").render({ repo: repo, number: $(this).attr("number")}))
                                .dialog({title: $(this).attr("number")+': '+$(this).attr("title")+' ('+$(this).attr("state")+')', width: 800 });
                ev.preventDefault();
            });
            $(".updatepullrequest").click(function(ev) {
                var dia = $('<div></div>').html($("#updatePullRequestTemplate").render({}))
                                          .dialog({title: $(this).attr("number")+': '+$(this).attr("title")+' ('+$(this).attr("state")+')' });
                $("button", dia).click(function(r, n, dia) { return function(ev) { updateRepo(r, n, dia); ev.preventDefault();}}(repo, $(this).attr("number"), dia) );
                ev.preventDefault();
            });
            $("#repoPullList").accordion({ autoHeight: false });
            $("#repoContent").show();
            $.bbq.pushState({ repo: repo });
        }
    });
 
}