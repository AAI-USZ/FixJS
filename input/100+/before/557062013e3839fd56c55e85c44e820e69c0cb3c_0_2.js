function(ev) {
                $('<div></div>').html($("#pullInstructionTemplate").render({ repo: repo, number: $(this).attr("number")}))
                                .dialog({title: $(this).attr("number")+': '+$(this).attr("title")+' ('+$(this).attr("state")+')', width: 800 });
                ev.preventDefault();
            }