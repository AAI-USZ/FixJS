function (data) {
            $("#loading").hide();
            if (data.meta && data.meta.Link) {
               for (i=0; i<data.meta.Link.length; i++) {
                   var link = data.meta.Link[i];
                   if (link[1].rel == "next") {
                       $("#nextRepoPage").show().click(function() {
                             $(this).hide();
                             loadRepo(repo, data.meta.Link[0][0]);
                       });
                       break;
                   }
               }
            } else {
               $("#nextRepoPage").hide();
            }
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